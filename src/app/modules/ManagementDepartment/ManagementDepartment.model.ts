import { Schema, model } from 'mongoose';
import {
  ManagementDepartmentModel,
  ManagementDepartmentType,
} from './ManagementDepartment.interface';

export const ManagementDepartmentSchema = new Schema<
  ManagementDepartmentType,
  ManagementDepartmentModel
>(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const ManagementDepartment = model<
  ManagementDepartmentType,
  ManagementDepartmentModel
>('ManagementDepartment', ManagementDepartmentSchema);
