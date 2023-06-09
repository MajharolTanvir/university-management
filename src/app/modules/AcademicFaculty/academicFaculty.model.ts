import { Schema, model } from 'mongoose';

import {
  AcademicFacultyModel,
  AcademicFacultyType,
} from './academicFaculty.interface';

const AcademicFacultySchema = new Schema<
  AcademicFacultyType,
  AcademicFacultyModel
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

export const AcademicFaculty = model<AcademicFacultyType, AcademicFacultyModel>(
  'AcademicFaculty',
  AcademicFacultySchema
);
