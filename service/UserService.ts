import UserDao from "../dao/UserDao";
import PogDao from "../dao/PogDao";
import walletDao from "../dao/walletDao";

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
    if (user.password === password) {
      return user;
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

  async registerUser(email: string, username: string, password: string) {
    if (!email || !username || !password) {
      return { error: 'Bad Request.' };
    }
    try {
      const checkUser = await UserDao.getUserByEmail(email);
      if (checkUser) {
        return { error: 'User already exists.' };
      } else {
        const newUser = await UserDao.createUser(email, username, password);
        return newUser;
      }
    } catch (error) {
      console.error(error);
      return { error: 'Internal Server Error.' };
    }
  }

  async buyPogs(user_id: number, pog_id: number, quantity) {
    const getUser = await UserDao.getUserById(user_id);
    if (!getUser) return { error: "User not found." };
    const getPog = await PogDao.getPogById(pog_id);
    if (!getPog) return { error: "Pog not found." };
    const wallet = await walletDao.getWalletById(user_id);
    if ("error" in wallet) return wallet.error;
    else {
      if (wallet.balance < getPog.price * quantity) {
        return { error: "Insufficient balance." };
      } else {
        const newBalance = wallet.balance - getPog.price * quantity;
        await walletDao.updateWallet(user_id, { balance: newBalance });
        return { message: "Transaction successful." }
      }
    }
  }

  async sellPogs(user_id: number, pog_id: number, quantity) {
    const user = await UserDao.getUserById(user_id);
    if (!user) return { error: "User not found." };
    const pog = await PogDao.getPogById(pog_id);
    if (!pog) return { error: "Pog not found." };
    const wallet = await walletDao.getWalletById(user_id);
    if ("error" in wallet) return wallet.error;
    else {
      const newBalance = wallet.balance + pog.price * quantity;
      await walletDao.updateWallet(wallet.id, { balance: newBalance });
      return { message: "Transaction successful." };
    }
  }

  async increaseBalance(user_id: number, amount: number) {
    const user = await UserDao.getUserById(user_id);
    if (!user) return { error: "User not found." };
    const wallet = await walletDao.getWalletById(user_id);
    if ("error" in wallet) return wallet.error;
    else {
      const newBalance = wallet.balance + amount;
      await walletDao.updateWallet(wallet.id, { balance: newBalance });
      return { message: "Balance updated." };
    }
  }
}

export default new UserService();