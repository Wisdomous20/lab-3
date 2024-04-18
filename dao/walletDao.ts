import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class WalletDao {
    async getAllWallets(){
        return await prisma.wallet.findMany();
    }

    async getWalletById(id: number){
        return await prisma.wallet.findUnique({
            where: {
                id: id
            }
        });
    }

    async createWallet(data: any){
        return await prisma.wallet.create({
            data
        });
    }

    async updateWallet(id: number, data: any){
        return await prisma.wallet.update({
            where: { id },
            data
        });


    }

    async deleteWallet(id: number){
        return await prisma.wallet.delete({
            where: { id }
        });
    }
}

export default new WalletDao();