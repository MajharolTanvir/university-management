import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { StudentType } from './student.interface';
import { studentFilterableFields } from './student.constant';
import { StudentService } from './student.service';

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await StudentService.getAllStudents(
    filters,
    paginationOptions
  );

  sendResponse<StudentType[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await StudentService.getSingleStudent(id);

  sendResponse<StudentType>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty retrieved successfully',
    data: result,
  });
});

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await StudentService.updateStudent(id, updatedData);

  sendResponse<StudentType>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty updated successfully',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await StudentService.deleteStudent(id);

  sendResponse<StudentType>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty deleted successfully',
    data: result,
  });
});

export const StudentsController = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
