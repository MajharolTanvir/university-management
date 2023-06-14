/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helper/paginationHelper';
import { GenericResponse } from '../../../interfaces/common';
import { PaginationOptionsType } from '../../../interfaces/paginationType';
import httpStatus from 'http-status';
import { FacultyType, facultyFiltersType } from './faculty.interface';
import { facultySearchableFields } from './faculty.constant';
import { Faculty } from './faculty.model';
import { User } from '../user/user.model';
import mongoose from 'mongoose';

const getAllFaculty = async (
  filters: facultyFiltersType,
  paginationOptions: PaginationOptionsType
): Promise<GenericResponse<FacultyType[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: facultySearchableFields.map(field => ({
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

  const result = await Faculty.find(whereCondition)
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Faculty.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleFaculty = async (id: string): Promise<FacultyType | null> => {
  const result = await Faculty.findById(id)
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};

const updateFaculty = async (
  id: string,
  payload: Partial<FacultyType>
): Promise<FacultyType | null> => {
  const isExist = await Faculty.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found');
  }

  const { name, ...facultyData } = payload;
  const updatedStudentData: Partial<FacultyType> = { ...facultyData };

  // Dynamically update handling
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Faculty.findOneAndUpdate({ id }, updatedStudentData, {
    new: true,
  });
  return result;
};

const deleteFaculty = async (id: string): Promise<FacultyType | null> => {
  const user = await User.findOne({ id });
  const faculty = await Faculty.findOne({ id });

  if (!user || !faculty) {
    throw new ApiError(httpStatus.NOT_FOUND, `Faculty not found`);
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    await User.findOneAndDelete({ id });
    await Faculty.findOneAndDelete({ id })
      .populate('academicDepartment')
      .populate('academicFaculty');

    await session.commitTransaction();
    await session.endSession();
    return faculty;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not deleted yet');
  }
};

export const FacultyService = {
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
