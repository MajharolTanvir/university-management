import express from 'express';
import { ManagementDepartmentController } from './ManagementDepartment.controller';
import validationRequest from '../../middlewares/validationRequest';
import { ManagementDepartmentValidation } from './ManagementDepartment.validation';

const router = express.Router();

router.post(
  '/create-management-department',
  validationRequest(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.createManagementDepartment
);
router.get('/', ManagementDepartmentController.getAllManagementDepartment);
router.get(
  '/:id',
  ManagementDepartmentController.getSingleManagementDepartment
);
router.delete(
  '/:id',
  ManagementDepartmentController.deleteManagementDepartment
);
router.patch(
  '/:id',
  validationRequest(
    ManagementDepartmentValidation.updateManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.updateManagementDepartment
);

export const ManagementDepartmentRoutes = router;
