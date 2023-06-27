import { Model } from 'mongoose';

export type LoginUserType = {
  id: string;
  password: string;
};

export type LoginUserResponseType = {
  accessToken: string;
  refreshToken?: string;
  needsPasswordChange: boolean | undefined;
}

export type RefreshTokenResponseType = {
  accessToken: string;
};

export type LoginUserModel = Model<LoginUserType, Record<string, unknown>>;
