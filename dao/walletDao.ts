import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class WalletDao {
    async getAllWallets() {
        return await prisma.wallet.findMany();
    }

    async getWalletById(id: number) {
        return await prisma.wallet.findUnique({
            where: {
                id: id
            }
        });
    }

    async createWallet(userId: number, pogsId: number, quantity: number) {
        const wallet = await prisma.wallet.create({
            data: {
                userId,
                pogsId,
                quantity: quantity,
            },
        });
        return wallet;
    }

    async updateWallet(id: number, data: any) {
        return await prisma.wallet.update({
            where: { id },
            data
        });
    }

    async deleteWallet(id: number) {
        return await prisma.wallet.delete({
            where: { id }
        });
    }

    async getWalletByUser(user_id: number) {
        const user = await prisma.wallet.findMany({
            where: {
                userId: user_id
            }
        });

        return user;
    }
}

export default new WalletDao();

// const wallet = new WalletDao();

// async function createWallet() {
//     const newWallet = await wallet.createWallet(3,3,10);

//     console.log(newWallet);
// }

// createWallet()