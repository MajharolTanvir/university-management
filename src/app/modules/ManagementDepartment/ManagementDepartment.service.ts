import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helper/paginationHelper';
import { GenericResponse } from '../../../interfaces/common';
import { PaginationOptionsType } from '../../../interfaces/paginationType';
import {
  ManagementDepartmentType,
  managementDepartmentFiltersType,
} from './ManagementDepartment.interface';
import { managementDepartmentSearchableFields } from './ManagementDepartment.constant';
import { ManagementDepartment } from './ManagementDepartment.model';

const createManagementDepartment = async (
  payload: ManagementDepartmentType
): Promise<ManagementDepartmentType> => {
  const result = await ManagementDepartment.create(payload);
  return result;
};

const getAllManagementDepartment = async (
  filters: managementDepartmentFiltersType,
  paginationOptions: PaginationOptionsType
): Promise<GenericResponse<ManagementDepartmentType[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: managementDepartmentSearchableFields.map(field => ({
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

  const result = await ManagementDepartment.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await ManagementDepartment.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleManagementDepartment = async (
  id: string
): Promise<ManagementDepartmentType | null> => {
  const result = await ManagementDepartment.findById(id);
  return result;
};

const updateManagementDepartment = async (
  id: string,
  payload: Partial<ManagementDepartmentType>
): Promise<ManagementDepartmentType | null> => {
  const result = await ManagementDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  );
  return result;
};

const deleteManagementDepartment = async (
  id: string
): Promise<ManagementDepartmentType | null> => {
  const result = await ManagementDepartment.findByIdAndDelete(id);
  return result;
};

export const ManagementDepartmentService = {
  createManagementDepartment,
  getAllManagementDepartment,
  getSingleManagementDepartment,
  updateManagementDepartment,
  deleteManagementDepartment,
};
