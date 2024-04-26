import express from "express";
import walletService from "../service/walletService";

class WalletController {
  async getAllWallets(req: express.Request, res: express.Response) {
    const id = Number(req.params.id);

    try {
      const wallet = await walletService.getAllWallets();
      if ("error" in wallet) {
        res.status(404).send(wallet.error);
      } else {
        res.status(200).send(wallet);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getWalletById(req: express.Request, res: express.Response) {
    const id = Number(req.params.id);
    try {
      const wallet = await walletService.getWalletById(id);
      if ("error" in wallet) {
        res.status(404).send(wallet.error);
      } else {
        res.status(200).send(wallet);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error.");
    }
  }

  async createWallet(req: express.Request, res: express.Response) {
    const data = req.body;
    const { userId, pogsId, quantity } = data; // Destructure the data object to get the userId, pogsId, and quantity
    try {
      const wallet = await walletService.createWallet(userId, pogsId, quantity); // Pass the userId, pogsId, and quantity as arguments
      if ("error" in wallet) {
        res.status(400).send(wallet);
      } else {
        res.status(201).send(wallet);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error.");
    }
  }

  async updateWallet(req: express.Request, res: express.Response) {
    const id = Number(req.params.id);
    const data = req.body;

    try {
      const pogsId = Number(req.params.pogsId);
      const walletUpdate = await walletService.updateWallet(id, data, pogsId);
      res.status(200).send(walletUpdate);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error.");
    }
  }

  async deleteWallet(req: express.Request, res: express.Response) {
    const id = Number(req.params.id);
    const pogsId = Number(req.params.pogsId);
    try {
      const walletDelete = await walletService.deleteWallet(id, pogsId);
      res.status(200).send(walletDelete);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error.");
    }
  }

  async getWalletByUser(req: express.Request, res: express.Response) {
    const userId = Number(req.params.userId);
    try {
      const walletContent = await walletService.getWalletByUserId(userId);
      res.status(200).send(walletContent);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error.");
    }
  }

  async getWalletByUserId(req: express.Request, res: express.Response) {
    const userId = Number(req.params.userId);

    try {
      const wallet = await walletService.getWalletByUserId(userId);
      if (wallet) {
        res.status(200).send(wallet);
      } else {
        res.status(404).send({ error: "Wallet not found for the user" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error.");
    }
  }
}

export default new WalletController();
