import express from 'express';
import { FacultyController } from './faculty.controller';
import { FacultyValidation } from './faculty.validation';
import validationRequest from '../../middlewares/validationRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.get('/', auth(
  ENUM_USER_ROLE.SUPER_ADMIN,
  ENUM_USER_ROLE.ADMIN,
  ENUM_USER_ROLE.FACULTY
), FacultyController.getAllFaculty);
router.get('/:id', auth(
  ENUM_USER_ROLE.SUPER_ADMIN,
  ENUM_USER_ROLE.ADMIN,
  ENUM_USER_ROLE.FACULTY
), FacultyController.getSingleFaculty);
router.delete('/:id', auth(ENUM_USER_ROLE.SUPER_ADMIN), FacultyController.deleteFaculty);
router.patch(
  '/:id',
  validationRequest(FacultyValidation.updateFacultyZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  FacultyController.updateFaculty
);

export const FacultyRoutes = router;
