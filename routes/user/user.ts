import { Router } from 'express';
import UserController from "../../controller/userController";
import { auth } from '../../middleware/auth';
export const userRouter = Router();

userRouter.get('/api/:id', UserController.getUserById);
userRouter.get('/api', UserController.getAllUsers);
userRouter.get('/api-get-email', UserController.getUserByEmail);
userRouter.post('/api-login', UserController.userLogin);
userRouter.post('/api-register', UserController.registerUser);
userRouter.post('/api-buy-pogs', UserController.buyPogs);
userRouter.post('/api-sell-pogs/:user_id', UserController.sellPogs);
userRouter.post('/api-increase-balanace', UserController.increaseBalance);
userRouter.put('/api/:id', UserController.updateUser);
userRouter.delete('/api:id', UserController.deleteUser);

export default userRouter;


