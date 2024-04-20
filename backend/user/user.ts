import { Router } from 'express';
import UserController from "../../controller/userController";

export const userRouter = Router();

userRouter.get('/api/:id', UserController.getUserById);
userRouter.get('/api', UserController.getAllUsers);
userRouter.get('/email/:email', UserController.getUserByEmail);

userRouter.post('/login', UserController.userLogin);
userRouter.post('/register', UserController.registerUser);  
