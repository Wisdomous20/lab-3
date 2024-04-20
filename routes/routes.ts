import express from 'express';
import { userRouter } from './user/user';
import { pogsRouter } from './pogs/pogs';
import { walletRouter } from './wallet/wallet';

export const router = express.Router();

router.use('/user', userRouter);
router.use('/pogs', pogsRouter);
router.use('/wallet', walletRouter);
