import ApiError from '../../../errors/ApiError';
import { academicSemesterTitleCodeMapper } from './academicSemester.constant';
import { AcademicSemesterType } from './academicSemester.interface';
import AcademicSemester from './academicSemester.model';
import httpStatus from 'http-status';

const createSemester = async (
  payload: AcademicSemesterType
): Promise<AcademicSemesterType> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemesterService = { createSemester };
