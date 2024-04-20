import { Router } from 'express';
import UserController from "../../controller/userController";
import userController from '../../controller/userController';

export const userRouter = Router();

userRouter.get('/api/:id', UserController.getUserById);
userRouter.get('/api', UserController.getAllUsers);
userRouter.get('/api-get-email', UserController.getUserByEmail);
userRouter.post('/api-login', userController.userLogin);
userRouter.post('/api-register', userController.registerUser);
userRouter.post('/api-buy-pogs', userController.buyPogs);
userRouter.post('/api-sell-pogs/:user_id', userController.sellPogs);
userRouter.post('/api-increase-balanace', userController.increaseBalance);
userRouter.post('/api', userController.registerUser);
userRouter.put('/api/:id', UserController.updateUser);
userRouter.delete('/api:id', userController.deleteUser);

