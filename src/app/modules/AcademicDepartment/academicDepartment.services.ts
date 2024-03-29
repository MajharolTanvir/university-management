import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helper/paginationHelper';
import { GenericResponse } from '../../../interfaces/common';
import { PaginationOptionsType } from '../../../interfaces/paginationType';
import { academicDepartmentSearchableFields } from './academicDepartment.constants';
import {
  AcademicDepartmentFiltersType,
  AcademicDepartmentType,
  IAcademicDepartmentType,
} from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';
import { AcademicFacultyType } from '../AcademicFaculty/academicFaculty.interface';
import { AcademicFaculty } from '../AcademicFaculty/academicFaculty.model';

const createDepartment = async (
  payload: AcademicDepartmentType
): Promise<AcademicDepartmentType | null> => {
  const result = (await AcademicDepartment.create(payload)).populate(
    'academicFaculty'
  );
  return result;
};

const getAllDepartments = async (
  filters: AcademicDepartmentFiltersType,
  paginationOptions: PaginationOptionsType
): Promise<GenericResponse<AcademicDepartmentType[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: academicDepartmentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $paginationOptions: 'i',
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

  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicDepartment.find(whereConditions)
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicDepartment.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleDepartment = async (
  id: string
): Promise<AcademicFacultyType | null> => {
  const result = await AcademicDepartment.findById(id).populate(
    'academicFaculty'
  );
  return result;
};

const updateDepartment = async (
  id: string,
  payload: AcademicDepartmentType
): Promise<AcademicDepartmentType | null> => {
  const result = await AcademicDepartment.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true }
  ).populate('academicFaculty');

  return result;
};

const deleteDepartment = async (
  id: string
): Promise<AcademicDepartmentType | null> => {
  const result = await AcademicDepartment.findByIdAndDelete(id);
  return result;
};

const createDepartmentEvent = async (
  payload: IAcademicDepartmentType
): Promise<void> => {
  const academicFaculty = await AcademicFaculty.findOne({
    syncId: payload.academicFacultyId,
  });

  await AcademicDepartment.create({
    title: payload.title,
    academicFaculty: academicFaculty?._id,
    syncId: payload.id,
  });
};

const updateDepartmentEvent = async (
  e: IAcademicDepartmentType
): Promise<void> => {
  const academicFaculty = await AcademicFaculty.findOne({
    syncId: e.academicFacultyId,
  });
  const payload = {
    title: e.title,
    academicFaculty: academicFaculty?._id,
  };

  await AcademicDepartment.findOneAndUpdate(
    { syncId: e.id },
    {
      $set: payload,
    }
  );
};

const deleteDepartmentEvent = async (syncId: string): Promise<void> => {
  await AcademicDepartment.findOneAndDelete({ syncId });
};

export const AcademicDepartmentService = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
  createDepartmentEvent,
  updateDepartmentEvent,
  deleteDepartmentEvent,
};
