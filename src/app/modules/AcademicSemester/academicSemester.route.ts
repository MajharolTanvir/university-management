import express from 'express';
import { AcademicSemesterValidation } from './academicSemester.validation';
import validationRequest from '../../middlewares/validationRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/create-semester',
  validationRequest(AcademicSemesterValidation.academicSemesterZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicSemesterController.createSemester
);

router.get('/:id', auth(
  ENUM_USER_ROLE.SUPER_ADMIN,
  ENUM_USER_ROLE.ADMIN,
  ENUM_USER_ROLE.FACULTY,
  ENUM_USER_ROLE.STUDENT
),
  AcademicSemesterController.getSingleSemester);

router.patch(
  '/:id',
  validationRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicSemesterController.updateSemester
);
router.delete('/:id', auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), AcademicSemesterController.deleteAcademicSemester);
router.get('/', auth(
  ENUM_USER_ROLE.SUPER_ADMIN,
  ENUM_USER_ROLE.ADMIN,
  ENUM_USER_ROLE.FACULTY,
  ENUM_USER_ROLE.STUDENT
), AcademicSemesterController.getAllSemesters);

export const AcademicSemesterRoutes = router;
