import express from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { AdminController } from './admin.controller';
import { AdminValidation } from './admin.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), AdminController.getAllAdmin);
router.get('/:id', auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), AdminController.getSingleAdmin);
router.delete('/:id', auth(ENUM_USER_ROLE.SUPER_ADMIN), AdminController.deleteAdmin);
router.patch(
  '/:id',
  validationRequest(AdminValidation.updateAdminZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AdminController.updateAdmin
);

export const AdminRoutes = router;
