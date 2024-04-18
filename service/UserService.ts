import UserDao from "../dao/UserDao";

class UserService {
    async getUserById(id: number) {
        if(!id) {
            return { error: "Invalid ID." };
        }
        try{
            const user = await UserDao.getUserById(id);
            if(!user) {
                return { error: "User not found." };
            }else{
                return user;
            }
        }catch(error) {
            console.error(error);
            return { error: "Internal Server Error." };
        }
    }

    async getUserByEmail(email: string) {
        if(!email) {
            return { error: "Invalid Email." };
        }
        try{
            const user = await UserDao.getUserByEmail(email);
            if(!user) {
                return { error: "User not found." };
            }else{
                return user;
            }
        }catch(error){
            console.error(error);
            return { error: "Internal Server Error." };
        }
    }

    async registerUser(email: string, username: string, password: string) {
        if(!email || !username || !password) {
            return { error: "Invalid data." };
        }
        try{
            const user = await UserDao.createUser(email, username, password);
            return user;
        }catch(error){
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
    
}

export default new UserService();