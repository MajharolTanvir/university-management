import { Model, Types } from 'mongoose';
import { AcademicFacultyType } from '../AcademicFaculty/academicFaculty.interface';

export type AcademicDepartmentType = {
  title: string;
  academicFaculty: Types.ObjectId | AcademicFacultyType;
};

export type AcademicDepartmentModel = Model<
  AcademicDepartmentType,
  Record<string, unknown>
>;

export type AcademicDepartmentFiltersType = {
  searchTerm?: string;
  academicFaculty?: Types.ObjectId;
};
