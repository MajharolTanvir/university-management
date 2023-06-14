import { Model, Types } from 'mongoose';
import { StudentType } from '../Student/student.interface';
import { FacultyType } from '../Faculty/faculty.interface';
import { AdminType } from '../Admin/admin.interface';

export type UserTypes = {
  id: string | null;
  role: string;
  password: string;
  student?: Types.ObjectId | StudentType;
  faculty?: Types.ObjectId | FacultyType;
  admin?: Types.ObjectId | AdminType;
};

export type UserModel = Model<UserTypes, Record<string, unknown>>;
