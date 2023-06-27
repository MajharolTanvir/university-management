/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { StudentType } from '../Student/student.interface';
import { FacultyType } from '../Faculty/faculty.interface';
import { AdminType } from '../Admin/admin.interface';

export type UserTypes = {
  id: string | null;
  role: string;
  password: string;
  needsPasswordChange: true | false;
  student?: Types.ObjectId | StudentType;
  faculty?: Types.ObjectId | FacultyType;
  admin?: Types.ObjectId | AdminType;
};

export type UserMethodType = {
  isUserExist(id: string): Promise<Partial<UserTypes> | null>;
  isPasswordMatch(givenPassword: string, savedPassword: string): Promise<boolean>;
}

export type UserModel = Model<UserTypes, Record<string, unknown>, UserMethodType>;
