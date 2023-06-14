import express from 'express';
import { StudentsController } from './student.controller';
import validationRequest from '../../middlewares/validationRequest';
import { StudentValidation } from './student.validattion';

const router = express.Router();

router.get('/', StudentsController.getAllStudents);
router.get('/:id', StudentsController.getSingleStudent);
router.delete('/:id', StudentsController.deleteStudent);
router.patch(
  '/:id',
  validationRequest(StudentValidation.updateStudentZodSchema),
  StudentsController.updateStudent
);

export const StudentRoutes = router;
