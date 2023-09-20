import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helper/paginationHelper';
import { GenericResponse } from '../../../interfaces/common';
import { PaginationOptionsType } from '../../../interfaces/paginationType';
import { academicFacultySearchableFields } from './academicFaculty.constant';
import {
  AcademicFacultyEventType,
  AcademicFacultyFiltersType,
  AcademicFacultyType,
} from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createFaculty = async (
  payload: AcademicFacultyType
): Promise<AcademicFacultyType | null> => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllFaculties = async (
  filters: AcademicFacultyFiltersType,
  paginationOptions: PaginationOptionsType
): Promise<GenericResponse<AcademicFacultyType[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: academicFacultySearchableFields.map(field => ({
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

  const result = await AcademicFaculty.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await AcademicFaculty.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleFaculty = async (
  id: string
): Promise<AcademicFacultyType | null> => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

const updateFaculty = async (
  id: string,
  payload: AcademicFacultyType
): Promise<AcademicFacultyType | null> => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteFaculty = async (
  id: string
): Promise<AcademicFacultyType | null> => {
  const result = await AcademicFaculty.findByIdAndDelete(id);
  return result;
};

const createFacultyEvent = async (
  payload: AcademicFacultyEventType
): Promise<void> => {
  await AcademicFaculty.create({
    title: payload.title,
    syncId: payload.id
  });
};

const updateFacultyEvent = async (
  payload: AcademicFacultyEventType
): Promise<void> => {
  await AcademicFaculty.findOneAndUpdate(
    { syncId: payload.id },
    {
      $set: { title: payload.title, syncId: payload.id },
    }
  );
};

const deleteFacultyEvent = async (
  payload: AcademicFacultyEventType
): Promise<void> => {
  await AcademicFaculty.deleteOne({
    syncId: payload,
  });
};

export const AcademicFacultyService = {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
  createFacultyEvent,
  updateFacultyEvent,
  deleteFacultyEvent,
};
