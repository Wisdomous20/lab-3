import walletDao from "../dao/walletDao";

class WalletService {

    async getAllWallets() {
        try {
            const wallets = await walletDao.getAllWallets();
            if (wallets.length === 0) {
                return { error: 'No wallets found' };
            } else {
                return wallets;
            }
        } catch (error) {
            console.error(error);
            return { error: 'Internal Server Error' };
        }
    }

    async getWalletById(id: number) {
        if (!id) {
            return { error: 'Invalid id' };
        }
        try {
            const wallet = await walletDao.getWalletById(id);
            if (!wallet) {
                return { error: 'Wallet not found' };
            } else {
                return wallet;
            }
        } catch (error) {
            console.error(error);
            return { error: 'Internal Server Error' };
        }
    }

    async createWallet(data: any) {
        if (!data) {
            return { error: 'Invalid data' };
        }
        try {
            const wallet = await walletDao.createWallet(data);
            return wallet;
        } catch (error) {
            console.error(error);
            return { error: 'Internal Server Error' };
        }
    }

    async updateWallet(id: number, data: any) {
        if (!id || !data || Object.keys(data).length === 0) {
            return { error: 'Invalid data' };
        }

        try {
            const wallet = await walletDao.getWalletById(id);
            if (!wallet) {
                return { error: 'Wallet not found' };
            } else {
                const updatedWallet = await walletDao.updateWallet(id, data);
                return updatedWallet;
            }
        } catch (error) {
            console.error(error);
            return { error: 'Internal Server Error' };
        }
    }

    async deleteWallet(id: number) {
        if (!id) {
            return { error: 'Invalid id' };
        }
        try {
            const wallet = await walletDao.getWalletById(id);
            if (!wallet) {
                return { error: 'Wallet not found' };
            } else {
               const deleted =  await walletDao.deleteWallet(id);
                return deleted;
            }
        } catch (error) {
            console.error(error);
            return { error: 'Internal Server Error' };
        }
    }

    async getWalletByUser(user_id: number) {
        if(!user_id){
            return { error: 'Invalid user_id' };
        }
        try{
            const wallet = await walletDao.getWalletByUser(user_id);
            if(!wallet){
                return { error: 'Wallet not found' };
            }else{
                return wallet;
            }
        }catch(error){
            console.error(error);
            return { error: 'Internal Server Error' };
        }
    }
}

export default new WalletService();