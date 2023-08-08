import express from 'express';
import { USerController } from './user.controller';
import { UserValidation } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(UserValidation.createUserZodSchema),
  USerController.createUser,
);

export const UserRoutes = router;
