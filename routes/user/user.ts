import { Router } from 'express';
import UserController from "../../controller/userController";

export const userRouter = Router();

userRouter.get('/:id', UserController.getUserById);
userRouter.post('/login', UserController.userLogin);
userRouter.post('/register', UserController.registerUser);  
