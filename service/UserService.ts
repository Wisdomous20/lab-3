import UserDao from "../dao/UserDao";
import PogDao from "../dao/PogDao";
import walletDao from "../dao/walletDao";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

class UserService {
  async getAllUsers() {
    try {
      const users = await UserDao.getAllUsers();
      if (!users) {
        return { error: 'No users found.' };
      } else {
        return users;
      }
    } catch (error) {
      console.error(error);
      return { error: 'Internal Server Error.' };
    }
  }
  async getUserById(id: number) {
    if (!id) {
      return { error: "Invalid ID." };
    }
    try {
      const user = await UserDao.getUserById(id);
      if (!user) {
        return { error: "User not found." };
      } else {
        return user;
      }
    } catch (error) {
      console.error(error);
      return { error: "Internal Server Error." };
    }
  }

  async getUserByEmail(email: string) {
    if (!email) {
      return { error: "Invalid Email." };
    }
    try {
      const user = await UserDao.getUserByEmail(email);
      if (!user) {
        return { error: "User not found." };
      } else {
        return user;
      }
    } catch (error) {
      console.error(error);
      return { error: "Internal Server Error." };
    }
  }

  async userLogin(email: string, password: string) {
    const user = await this.getUserByEmail(email)
    if ("error" in user) return user.error;
    if (await bcrypt.compare(password, user.password)) {
      return user;
    }
  }

  async registerUser(email: string, username: string, password: string) {
    if (!email || !username || !password) {
      return { error: 'Bad Request.' };
    }
    try {
      const checkUser = await UserDao.getUserByEmail(email);
      if (checkUser) {
        return { error: 'User already exists.' };
      } else {
        // Bcrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await UserDao.createUser(email, username, hashedPassword);

        return newUser
      }

    } catch (error) {
      console.error(error);
      return { error: 'Internal Server Error.' };
    }
  }


  async updateUser(id: number, data: any) {
    if (!id || !data || Object.keys(data).length === 0) {
      return { error: 'Bad Request.' };
    }
    try {
      const checkUser = await UserDao.getUserById(id);
      if (!checkUser) {
        return { error: 'User not found.' };
      } else {
        const updatedUser = await UserDao.updateUser(id, data);
        return updatedUser;
      }
    } catch (error) {
      console.error(error);
      return { error: 'Internal Server Error.' };
    }
  }

  async deleteUser(id: number) {
    if (!id) {
      return { error: 'Bad Request.' };
    }
    try {
      const checkUser = await UserDao.getUserById(id);
      if (!checkUser) {
        return { error: 'User not found.' };
      } else {
        const deletedUser = await UserDao.deleteUser(id);
        return deletedUser;
      }
    } catch (error) {
      console.error(error);
      return { error: 'Internal Server Error.' };
    }
  }



  async buyPogs(user_id: number, pog_id: number, quantity: number) {
    const getUser = await UserDao.getUserById(user_id);
    if (!getUser) return { error: "User not found." };
  
    const getPog = await PogDao.getPogById(pog_id);
    if (!getPog) return { error: "Pog not found." };
  
    const currentPrice = getPog.current_price * quantity;
    if (getUser.balance < currentPrice) return { error: "Insufficient balance." };
  
    let wallet = await walletDao.getWalletByUser(user_id, pog_id);
  
    if (!wallet || "error" in wallet) {
      wallet = await walletDao.createWallet(user_id, pog_id, quantity);
    } else {
      quantity += wallet.quantity;
      await walletDao.updateWallet(user_id, pog_id, { quantity: quantity });
    }
  
    const newBalance = getUser.balance - currentPrice;
    await UserDao.updateUser(user_id, { balance: newBalance });
  
    return { message: "Transaction successful." };
  }

  async sellPogs(user_id: number, pog_id: number, quantity: number) {
    const getUser = await UserDao.getUserById(user_id);
    if (!getUser) return { error: "User not found." };
  
    const pog = await PogDao.getPogById(pog_id);
    if (!pog) return { error: "Pog not found." };
  
    const wallet = await walletDao.getWalletByUser(user_id, pog_id);
    if (!wallet || "error" in wallet) return wallet?.error || { error: "Wallet not found." };

    const newQuantity = wallet.quantity - quantity;
    const newBalance = getUser.balance + pog.current_price * quantity;
    await UserDao.updateUser(user_id,{ balance: newBalance });
    await walletDao.updateWallet(user_id, pog_id, { quantity: newQuantity });
  
    return { message: "Transaction successful." };
  }
  

  async increaseBalance(user_id: number, amount: number) {
    const user = await UserDao.getUserById(Number(user_id));
    if (!user) return { error: "User not found." };
    const newBalance = user.balance + amount;
    return await UserDao.updateUser(user.id, { balance: newBalance });
  }
}

export default new UserService();

// const user = new UserService();

// async function buyPogs() {
//   const buyPogs = await user.buyPogs(1, 1, 1);
//   console.log(buyPogs);
// }

// buyPogs()