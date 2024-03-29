import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helper/paginationHelper';
import { GenericResponse } from '../../../interfaces/common';
import { PaginationOptionsType } from '../../../interfaces/paginationType';
import {
  academicSemesterSearchableFields,
  academicSemesterTitleCodeMapper,
} from './academicSemester.constant';
import {
  AcademicSemesterEvent,
  AcademicSemesterFiltersType,
  AcademicSemesterType,
} from './academicSemester.interface';
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
  filters: AcademicSemesterFiltersType,
  paginationOptions: PaginationOptionsType
): Promise<GenericResponse<AcademicSemesterType[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);
  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicSemester.find(whereCondition)
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

const getSingleSemester = async (
  id: string
): Promise<AcademicSemesterType | null> => {
  const result = await AcademicSemester.findById(id);
  return result;
};

const updateSemester = async (
  id: string,
  payload: Partial<AcademicSemesterType>
): Promise<AcademicSemesterType | null> => {
  if (
    payload.title &&
    payload.code &&
    academicSemesterTitleCodeMapper[payload?.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code');
  }

  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteAcademicSemester = async (
  id: string
): Promise<AcademicSemesterType | null> => {
  const result = await AcademicSemester.findByIdAndDelete(id);
  return result;
};

const createSemesterEvent = async (
  payload: AcademicSemesterEvent
): Promise<void> => {
  await AcademicSemester.create({
    title: payload.title,
    code: payload.code,
    year: payload.year,
    startMonth: payload.startMonth,
    endMonth: payload.endMonth,
    syncId: payload.id,
  });
};

const updateSemesterEvent = async (
  payload: AcademicSemesterEvent
): Promise<void> => {
  await AcademicSemester.findOneAndUpdate(
    { syncId: payload.id },
    {
      $set: {
        title: payload.title,
        code: payload.code,
        year: payload.year,
        startMonth: payload.startMonth,
        endMonth: payload.endMonth,
        syncId: payload.id,
      },
    }
  );
};

const deleteSemesterEvent = async (payload: string): Promise<void> => {
  await AcademicSemester.findOneAndDelete({ syncId: payload });
};

export const AcademicSemesterService = {
  createSemester,
  getAllSemester,
  getSingleSemester,
  updateSemester,
  deleteAcademicSemester,
  createSemesterEvent,
  updateSemesterEvent,
  deleteSemesterEvent,
};
