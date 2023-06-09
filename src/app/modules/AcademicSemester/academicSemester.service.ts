import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helper/paginationHelper';
import { GenericResponseType } from '../../../interfaces/common';
import { PaginationOptionsType } from '../../../interfaces/paginationType';
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

const getAllSemester = async (
  paginationOptions: PaginationOptionsType
): Promise<GenericResponseType<AcademicSemesterType[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);
  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const result = await AcademicSemester.find()
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const AcademicSemesterService = { createSemester, getAllSemester };
