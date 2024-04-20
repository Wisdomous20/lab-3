import { Router } from 'express';
import walletController from '../../controller/WalletController';

export const walletRouter = Router();

walletRouter.get('/api', walletController.getAllWallets);
walletRouter.get('api/:id', walletController.getWalletByUser);
walletRouter.get('/api-user-id', walletController.getWalletByUser);
walletRouter.post('/api', walletController.createWallet);
walletRouter.patch('/api/:id', walletController.updateWallet);
walletRouter.delete('/api/:id', walletController.deleteWallet);