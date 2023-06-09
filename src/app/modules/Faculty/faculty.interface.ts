import { Model, Types } from 'mongoose';
import { AcademicFacultyType } from '../AcademicFaculty/academicFaculty.interface';
import { AcademicDepartmentType } from '../AcademicDepartment/academicDepartment.interface';

type UserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type FacultyType = {
  id: string | null;
  name: UserName;
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB=' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  designation?: string;
  profileImage?: string;
  academicDepartment: Types.ObjectId | AcademicDepartmentType;
  academicFaculty: Types.ObjectId | AcademicFacultyType;
};

export type FacultyModel = Model<FacultyType, Record<string, unknown>>;

export type facultyFiltersType = {
  searchTerm?: string;
  id?: string;
  bloodGroups?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
};
