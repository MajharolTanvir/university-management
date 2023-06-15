import { Model, Types } from 'mongoose';
import { AcademicFacultyType } from '../AcademicFaculty/academicFaculty.interface';
import { AcademicSemesterType } from '../AcademicSemester/academicSemester.interface';
import { AcademicDepartmentType } from '../AcademicDepartment/academicDepartment.interface';

type UserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: number;
  address: string;
};

type LocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type StudentType = {
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
  guardian: Guardian;
  localGuardian: LocalGuardian;
  profileImage?: string;
  academicSemester: Types.ObjectId | AcademicSemesterType;
  academicDepartment: Types.ObjectId | AcademicDepartmentType;
  academicFaculty: Types.ObjectId | AcademicFacultyType;
};

export type StudentModel = Model<StudentType, Record<string, unknown>>;

export type studentFiltersType = {
  searchTerm?: string;
  id?: string;
  bloodGroups?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
};
