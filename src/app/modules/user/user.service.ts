import mongoose from 'mongoose';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import AcademicSemester from '../AcademicSemester/academicSemester.model';
import { StudentType } from '../Student/student.interface';
import { UserTypes } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import { Student } from '../Student/student.model';
import httpStatus from 'http-status';
import { FacultyType } from '../Faculty/faculty.interface';
import { Faculty } from '../Faculty/faculty.model';
import { AdminType } from '../Admin/admin.interface';
import { Admin } from '../Admin/admin.model';
import { RedisClient } from '../../../shared/redis';
import { EVENT_STUDENT_CREATED } from './user.constant';

const createStudent = async (
  student: StudentType,
  user: UserTypes
): Promise<UserTypes | null> => {
  // Default password
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }

  // Set role
  user.role = 'student';

  const academicSemesters = await AcademicSemester.findById(
    student.academicSemester
  ).lean();

  // Generate student id

  let newUserAllData = null;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const id = await generateStudentId(academicSemesters);
    user.id = id;
    student.id = id;

    const newStudent = await Student.create([student], { session });

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    //Set number --> _id into user.student
    user.student = newStudent[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  if (newUserAllData) {
    await RedisClient.publish(EVENT_STUDENT_CREATED, JSON.stringify(newUserAllData.student))
  }

  return newUserAllData;
};

const createFaculty = async (
  faculty: FacultyType,
  user: UserTypes
): Promise<UserTypes | null> => {
  // Default password
  if (!user.password) {
    user.password = config.default_faculty_pass as string;
  }

  // Set role
  user.role = 'faculty';

  // Generate student id

  let newUserAllData = null;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const id = await generateFacultyId();
    user.id = id;
    faculty.id = id;

    const newFaculty = await Faculty.create([faculty], { session });

    if (!newFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    //Set number --> _id into user.student
    user.faculty = newFaculty[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  return newUserAllData;
};

const createAdmin = async (
  admin: AdminType,
  user: UserTypes
): Promise<UserTypes | null> => {
  // Default password
  if (!user.password) {
    user.password = config.default_admin_pass as string;
  }

  // Set role
  user.role = 'admin';

  // Generate student id
  let newUserAllData = null;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const id = await generateAdminId();
    user.id = id;
    admin.id = id;

    const newAdmin = await Admin.create([admin], { session });

    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    //Set number --> _id into user.student
    user.admin = newAdmin[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate(
      'admin'
    );
  }

  return newUserAllData;
};

export const UserService = {
  createStudent,
  createFaculty,
  createAdmin,
};
