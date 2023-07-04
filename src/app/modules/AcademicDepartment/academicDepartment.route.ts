import express from 'express';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import validationRequest from '../../middlewares/validationRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-department',
  validationRequest(
    AcademicDepartmentValidation.createAcademicDepartmentZodSchema
  ),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AcademicDepartmentController.createDepartment
);

router.get('/:id', AcademicDepartmentController.getSingleDepartment);
router.patch(
  '/:id',
  validationRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentZodSchema
  ),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AcademicDepartmentController.updateDepartment
);
router.delete('/:id',auth(ENUM_USER_ROLE.ADMIN), AcademicDepartmentController.deleteDepartment);
router.get('/', AcademicDepartmentController.getAllDepartments);

export const AcademicDepartmentRoutes = router;
