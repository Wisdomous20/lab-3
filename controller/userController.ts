import express from 'express';
import { Request, Response } from 'express';
import UserService from "../service/UserService";
import jwt from 'jsonwebtoken';



class UserController{

  async getAllUsers(req: express.Request, res: express.Response) {
    try {
      const users = await UserService.getAllUsers();
      if ('error' in users) {
        res.status(404).send(users.error);
      } else {
        res.status(200).send(users);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error.');
    }
  }
    async getUserById(req: express.Request, res: express.Response) {
        const id = Number(req.params.id);
        try {
          const user = await UserService.getUserById(id);
          if ('error' in user) {
            res.status(404).send(user.error);
          } else {
            res.status(200).send(user);
          }
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error.');
        }
      }
    
      async getUserByEmail(req: express.Request, res: express.Response) {
        const { email } = req.body;
        try {
          const user = await UserService.getUserByEmail(email);
          if ('error' in user || !user) {
            res.status(404).send("User not found.");
          } else {
            res.status(200).send(user);
          }
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error.');
        }
      }
      
      async registerUser(req: Request, res: Response) {
        const { email, username, password } = req.body;
    
        try{
          const newUser = await UserService.registerUser(email, username, password);
          res.status(201).send(newUser);
        }catch(error){
          console.error(error);
          res.status(500).send('Internal Server Error.');
        }
      }

      async userLogin(req: express.Request, res: express.Response) {
        const { email, password } = req.body;
        try {
          const awaitUser = await UserService.userLogin(email, password);
          if (typeof awaitUser === "string" || !awaitUser) res.status(404).send(awaitUser);
          else {
            const userId = awaitUser.user?.id; 
            const token = jwt.sign(awaitUser, 'super secret key here');
            const send = { userId, token };
            res.status(200).send(send);
          }
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error.');
        }
      }

      async buyPogs(req: express.Request, res: express.Response) {
        const { user_id, pog_id, quantity } = req.body;
        try {
          const user = await UserService.buyPogs(user_id, pog_id, quantity);
          res.status(200).send(user);
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error.');
        }
      }

      async sellPogs(req: express.Request, res: express.Response) {
        const { user_id, pog_id, quantity } = req.body;
        try {
          const user = await UserService.sellPogs(user_id, pog_id, quantity);
          res.status(200).send(user);
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error.');
        }
      }

      async updateUser(req: express.Request, res: express.Response) {
        const id = Number(req.params.id);
        const data = req.body;
    
        try {
          const updatedUser = await UserService.updateUser(id, data);
          res.status(200).send(updatedUser);
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error.');
        }
      }

      async deleteUser(req: express.Request, res: express.Response) {
        const id = Number(req.params.id);
        try{
          const deletedUser = await UserService.deleteUser(id);
          res.status(200).send(deletedUser);
        }catch(error){
          console.error(error);
          res.status(500).send('Internal Server Error.');
        }
      }

      async increaseBalance(req: express.Request, res: express.Response) {
        const { user_id, amount } = req.body;
        try {
          const user = await UserService.increaseBalance(user_id, amount);
          res.status(200).send(user);
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error.');
        }
      }

      async getCurrentUser(req: express.Request, res: express.Response) {
        const id = Number(req.params.id);
        try {
          const user = await UserService.getUserById(id);
          if ('error' in user) {
            res.status(404).send(user.error);
          } else {
            res.status(200).send(user);
          }
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error.');
        }
      }
}

export default new UserController();