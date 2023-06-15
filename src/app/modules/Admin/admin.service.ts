/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helper/paginationHelper';
import { GenericResponse } from '../../../interfaces/common';
import { PaginationOptionsType } from '../../../interfaces/paginationType';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import mongoose from 'mongoose';
import { AdminType, adminFiltersType } from './admin.interface';
import { Admin } from './admin.model';
import { adminSearchableFields } from './admin.constant';

const getAllAdmin = async (
  filters: adminFiltersType,
  paginationOptions: PaginationOptionsType
): Promise<GenericResponse<AdminType[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: adminSearchableFields.map(field => ({
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

  const result = await Admin.find(whereCondition)
    .populate('managementDepartment')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Admin.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleAdmin = async (id: string): Promise<AdminType | null> => {
  const result = await Admin.findOne({ id }).populate('managementDepartment');
  return result;
};

const updateAdmin = async (
  id: string,
  payload: Partial<AdminType>
): Promise<AdminType | null> => {
  const isExist = await Admin.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found');
  }

  const { name, ...facultyData } = payload;
  const updatedStudentData: Partial<AdminType> = { ...facultyData };

  // Dynamically update handling
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Admin.findOneAndUpdate({ id }, updatedStudentData, {
    new: true,
  });
  return result;
};

const deleteAdmin = async (id: string): Promise<AdminType | null> => {
  const user = await User.findOne({ id });
  const faculty = await Admin.findOne({ id });

  if (!user || !faculty) {
    throw new ApiError(httpStatus.NOT_FOUND, `Admin not found`);
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    await User.findOneAndDelete({ id });
    await Admin.findOneAndDelete({ id }).populate('managementDepartment');

    await session.commitTransaction();
    await session.endSession();
    return faculty;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not deleted yet');
  }
};

export const AdminService = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
