import { Router } from "express";
import walletController from "../../controller/WalletController";

export const walletRouter = Router();

walletRouter.get("/api", walletController.getAllWallets);
// walletRouter.get("/api/:id", walletController.getWalletByUser);
walletRouter.get("/api/user/:userId", walletController.getWalletByUser);
walletRouter.get("/api/by-user/:userId", walletController.getWalletByUserId);
walletRouter.post("/api", walletController.createWallet);
walletRouter.patch("/api/:id", walletController.updateWallet);
walletRouter.delete("/api/:id", walletController.deleteWallet);
