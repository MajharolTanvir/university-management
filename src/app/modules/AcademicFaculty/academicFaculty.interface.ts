import { Model } from 'mongoose';

export type AcademicFacultyType = {
  title: string;
  syncId: string
};

export type AcademicFacultyModel = Model<
  AcademicFacultyType,
  Record<string, unknown>
  >;

  export type AcademicFacultyEventType = {
    title: string;
    id: string
  };


export type AcademicFacultyFiltersType = { searchTerm?: string };
