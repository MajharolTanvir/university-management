import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { managementDepartmentFilterableFields } from './ManagementDepartment.constant';
import { ManagementDepartmentType } from './ManagementDepartment.interface';
import { ManagementDepartmentService } from './ManagementDepartment.service';

const createManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...managementDepartmentData } = req.body;
    const result = await ManagementDepartmentService.createManagementDepartment(
      managementDepartmentData
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Department management is created successfully',
      data: result,
    });
  }
);

const getAllManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, managementDepartmentFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await ManagementDepartmentService.getAllManagementDepartment(
      filters,
      paginationOptions
    );

    sendResponse<ManagementDepartmentType[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Department management retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await ManagementDepartmentService.getSingleManagementDepartment(id);

    sendResponse<ManagementDepartmentType>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Department management retrieved successfully',
      data: result,
    });
  }
);

const updateManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await ManagementDepartmentService.updateManagementDepartment(
      id,
      updatedData
    );

    sendResponse<ManagementDepartmentType>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Department management updated successfully',
      data: result,
    });
  }
);

const deleteManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ManagementDepartmentService.deleteManagementDepartment(
      id
    );

    sendResponse<ManagementDepartmentType>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Department management deleted successfully',
      data: result,
    });
  }
);

export const ManagementDepartmentController = {
  createManagementDepartment,
  getAllManagementDepartment,
  getSingleManagementDepartment,
  updateManagementDepartment,
  deleteManagementDepartment,
};
