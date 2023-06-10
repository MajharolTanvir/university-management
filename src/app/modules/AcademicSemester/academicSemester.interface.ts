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
  year: string;
  code: AcademicSemesterCodes;
  startMonth: AcademicSemesterMonths;
  endMonth: AcademicSemesterMonths;
};

export type AcademicSemesterModel = Model<AcademicSemesterType>;

export type AcademicSemesterFiltersType = { searchTerm?: string };
