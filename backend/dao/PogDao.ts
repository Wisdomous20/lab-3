import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class PogDao{
    async getAllPogs(){
        return await prisma.pog.findMany();
    }

    async getPogById(id: number){
        return await prisma.pog.findUnique({
            where: {
                id: id
            }
        });
    }

    async createPog(data: any){
        return await prisma.pog.create({
            data
        });
    }

    async updatePog(id: number, data: any){
        return await prisma.pog.update({
            where: { id },
            data
        });
    }

    async updatePrice(){
        const list = await this.getAllPogs();
        
        for(let pogs of list){
            const currentPrice = pogs.price;
            const price = Math.floor(Math.random() * 1000);
            await this.updatePog(pogs.id, {price: price, previousPrice: currentPrice});
        }
    }

    async deletePog(id: number){
        return await prisma.pog.delete({
            where: { id }
        });
    }
}

export default new PogDao();