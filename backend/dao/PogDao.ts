import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class PogDao{
    async getAllPogs(){
        return await prisma.pogs.findMany();
    }

    async getPogById(id: number){
        return await prisma.pogs.findUnique({
            where: {
                id: id
            }
        });
    }

    async createPog(data: any){
        return await prisma.pogs.create({
            data
        });
    }

    async updatePog(id: number, data: any){
        return await prisma.pogs.update({
            where: { id },
            data
        });
    }

    async updatePrice(){
        const list = await this.getAllPogs();
        
        for(let pogs of list){
            const currentPrice = pogs.current_price;
            const price = Math.floor(Math.random() * 1000);
            await this.updatePog(pogs.id, {price: price, previousPrice: currentPrice});
        }
    }

    async deletePog(id: number){
        return await prisma.pogs.delete({
            where: { id }
        });
    }

    async PogsBytickerSymbol(tickerSymbol: string){
        return await prisma.pogs.findMany({
            where: {
                ticker_symbol: tickerSymbol
            }
        });
    }

    
}

export default new PogDao();