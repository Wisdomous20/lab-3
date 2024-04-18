import express from 'express';
import UserService from "../service/UserService";



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

      async userLogin(req: express.Request, res: express.Response) {
        const { email, password } = req.body;
    
        try {
          const user = await UserService.userLogin(email, password);
          if (typeof user === "string" || !user) res.status(404).send(user);
          else {
            const userId = user.id;
            const send = { userId};
            res.status(200).send(send);
          }
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error.');
        }
      }

      async registerUser(req: express.Request, res: express.Response) {
        const { email, username, password } = req.body;
        try {
          const user = await UserService.registerUser(email, username, password);
          if ('error' in user) {
            res.status(400).send(user.error);
          } else {
            res.status(201).send(user);
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
}

export default new UserController();