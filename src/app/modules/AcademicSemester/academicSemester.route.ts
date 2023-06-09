import express from 'express';
import { AcademicSemesterValidation } from './academicSemester.validation';
import validationRequest from '../../middlewares/validationRequest';
import { AcademicSemesterController } from './academicSemester.controller';

const router = express.Router();

router.post(
  '/create-semester',
  validationRequest(AcademicSemesterValidation.academicSemesterZodSchema),
  AcademicSemesterController.createSemester
);

router.get('/:id', AcademicSemesterController.getSingleSemester);
router.get('/', AcademicSemesterController.getAllSemesters);

export const AcademicSemesterRoutes = router;
