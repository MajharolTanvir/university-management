import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { LoginUserResponseType, LoginUserType, RefreshTokenResponseType, changePasswordType } from './auth.interface';
import { JwtHelper } from '../../../helper/jwtHelper';
import config from '../../../config';
import { JwtPayload, Secret } from 'jsonwebtoken';

const loginAuth = async (
  payload: LoginUserType
): Promise<LoginUserResponseType> => {
  const { id, password } = payload;

  const user = new User();
  // Check user exist
  const isUserExist = await user.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // Match user password
  if (
    isUserExist.password &&
    !user.isPasswordMatch(password, isUserExist?.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password does not match');
  }

  // create access token & refresh token
  const { id: userId, role, needsPasswordChange } = isUserExist;
  const accessToken = JwtHelper.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = JwtHelper.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expire_in as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

const refreshToken = async (token: string): Promise<RefreshTokenResponseType> => {
  //VERIFY TOKEN
  //invalid token - synchronous
  let verifiedToken = null;
  try {
    verifiedToken = JwtHelper.verifyToken(token, config.jwt.refresh_expire_in as string);
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token');
  }

  // Checking deleted user's refresh token
  const { userId } = verifiedToken;
  const user = new User();
  const isUserExist = await user.isUserExist(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  // Generate new token
  const newAccessToken = JwtHelper.createToken(
    {
      id: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
    );
    
    return {
        accessToken: newAccessToken,
    }
};


// const changePassword = async (
//   userData: JwtPayload | null,
//   payload: changePasswordType
// ): Promise<void> => {
  
//   const {oldPassword, newPassword} = payload

//   const user = new User();
//   // Check user exist
//   const isUserExist = await user.isUserExist(userData?.userId);

//   if (!isUserExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
//   }

//   // Checking old passwor
//   // Match user password
//   if (
//     isUserExist.password &&
//     !await user.isPasswordMatch(oldPassword, isUserExist?.password)
//   ) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'Old password is incorrect');
//   }

//   // Hash password before saving

//   const newHashedPassword = await bcrypt.hash(newPassword, Number(config.bcrypt_salt_rounds)) 

//   const updatedData = {
//     password: newHashedPassword,
//     needsPasswordChange: false,
//     passwordChangedAt: new Date()
//   }

//   //update password
//   await User.findOneAndUpdate({ id: userData?.userId }, updatedData )
// };

//Alternative way to change password


const changePassword = async (
  userData: JwtPayload | null,
  payload: changePasswordType
): Promise<void> => {

  const { oldPassword, newPassword } = payload

  const user = new User();
  // // Check user exist
  // const isUserExist = await user.isUserExist(userData?.userId);

  const isUserExist = await User.findOne({ id: userData?.userId }).select('+password')

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // Checking old password
  // Match user password
  if (
    isUserExist.password &&
    !await user.isPasswordMatch(oldPassword, isUserExist?.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old password is incorrect');
  }

  //Update data
isUserExist.password = newPassword
  // Updating password using save method
  isUserExist.save()
};

export const AuthService = {
  loginAuth,
  refreshToken,
  changePassword
};
