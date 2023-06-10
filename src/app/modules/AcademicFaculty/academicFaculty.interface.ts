import { Model } from 'mongoose';

export type AcademicFacultyType = {
  title: string;
};

export type AcademicFacultyModel = Model<
  AcademicFacultyType,
  Record<string, unknown>
>;

export type AcademicFacultyFiltersType = { searchTerm?: string };
