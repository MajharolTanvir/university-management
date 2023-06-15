import express from 'express';
import { UserController } from './user.controller';
import validationRequest from '../../middlewares/validationRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-student',
  validationRequest(UserValidation.createStudentZodSchema),
  UserController.createStudent
);

router.post(
  '/create-faculty',
  validationRequest(UserValidation.createFacultyZodSchema),
  UserController.createFaculty
);

router.post(
  '/create-admin',
  validationRequest(UserValidation.createAdminZodSchema),
  UserController.createAdmin
);

export const UserRoutes = router;
