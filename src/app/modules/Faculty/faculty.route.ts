import express from 'express';
import { FacultyController } from './faculty.controller';
import { FacultyValidation } from './faculty.validation';
import validationRequest from '../../middlewares/validationRequest';

const router = express.Router();

router.get('/', FacultyController.getAllFaculty);
router.get('/:id', FacultyController.getSingleFaculty);
router.delete('/:id', FacultyController.deleteFaculty);
router.patch(
  '/:id',
  validationRequest(FacultyValidation.updateFacultyZodSchema),
  FacultyController.updateFaculty
);

export const FacultyRoutes = router;
