import { Model, Types } from 'mongoose';
import { ManagementDepartmentType } from '../ManagementDepartment/ManagementDepartment.interface';

type UserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type AdminType = {
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
  managementDepartment: Types.ObjectId | ManagementDepartmentType;
  designation?: string;
  profileImage?: string;
};

export type AdminModel = Model<AdminType, Record<string, unknown>>;

export type adminFiltersType = {
  searchTerm?: string;
  id?: string;
  bloodGroups?: string;
  email?: string;
  contactNo?: string;
  designation?: string;
  emergencyContactNo?: string;
  managementDepartment?: string;
};
