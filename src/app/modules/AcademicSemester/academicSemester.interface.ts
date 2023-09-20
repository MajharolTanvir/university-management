import { Model } from 'mongoose';

export type AcademicSemesterMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type AcademicSemesterTitles = 'Autumn' | 'Summer' | 'Fall';
export type AcademicSemesterCodes = '01' | '02' | '03';

export type AcademicSemesterType = {
  title: AcademicSemesterTitles;
  year: number;
  code: AcademicSemesterCodes;
  startMonth: AcademicSemesterMonths;
  endMonth: AcademicSemesterMonths;
  syncId: string
};

export type AcademicSemesterModel = Model<AcademicSemesterType>;

export type AcademicSemesterFiltersType = { searchTerm?: string };


export type AcademicSemesterEvent = {
  title: string;
  year: number;
  code: string;
  startMonth: string;
  endMonth: string;
  id: string;
};