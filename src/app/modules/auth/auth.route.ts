import express from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post('/login', validationRequest(AuthValidation.createLoginZodSchema), AuthController.loginUser);
router.post(
  '/refresh-token',
  validationRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);


export const AuthRoutes = router;
