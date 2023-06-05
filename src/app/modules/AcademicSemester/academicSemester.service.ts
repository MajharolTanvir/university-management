import { AcademicSemesterType } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createSemester = async (
  payload: AcademicSemesterType
): Promise<AcademicSemesterType> => {
  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemesterService = { createSemester };
