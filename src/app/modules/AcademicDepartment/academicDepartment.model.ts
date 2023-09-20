import { Schema, model } from 'mongoose';
import {
  AcademicDepartmentModel,
  AcademicDepartmentType,
} from './academicDepartment.interface';

const academicDepartmentSchema = new Schema<
  AcademicDepartmentType,
  AcademicDepartmentModel
>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
    syncId: {
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

export const AcademicDepartment = model<
  AcademicDepartmentType,
  AcademicDepartmentModel
>('AcademicDepartment', academicDepartmentSchema);
