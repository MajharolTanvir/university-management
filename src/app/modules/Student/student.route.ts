import express from 'express';
import { StudentsController } from './student.controller';
import validationRequest from '../../middlewares/validationRequest';
import { StudentValidation } from './student.validattion';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/', auth(
  ENUM_USER_ROLE.SUPER_ADMIN,
  ENUM_USER_ROLE.ADMIN,
  ENUM_USER_ROLE.FACULTY,
  ENUM_USER_ROLE.FACULTY,
  ENUM_USER_ROLE.STUDENT
), StudentsController.getAllStudents);

router.get('/:id', auth(
  ENUM_USER_ROLE.SUPER_ADMIN,
  ENUM_USER_ROLE.ADMIN,
  ENUM_USER_ROLE.FACULTY,
  ENUM_USER_ROLE.FACULTY,
  ENUM_USER_ROLE.STUDENT
), StudentsController.getSingleStudent);

router.delete('/:id', auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), StudentsController.deleteStudent);

router.patch(
  '/:id',
  validationRequest(StudentValidation.updateStudentZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  StudentsController.updateStudent
);

export const StudentRoutes = router;
