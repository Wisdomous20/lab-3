import PogDao from "../dao/PogDao";

class pogsService {
    async getPogsByid(id: number) {
        if (!id) {
            return { error: "Invalid ID." };
        }
        try {
            const pogs = await PogDao.getPogById(id);
            if (!pogs) {
                return { error: "Pogs not found." };
            } else {
                return pogs;
            }
        } catch (error) {
            console.error(error);
            return { error: "Internal Server Error." };
        }
    }

    async getPogsBytickerSymbol(tickerSymbol: string) {
        if (!tickerSymbol) {
            return { error: "Invalid tickerSymbol." };
        }
        try {
            const pogs = await PogDao.PogsBytickerSymbol(tickerSymbol);
            if (!pogs) {
                return { error: "Pogs not found." };
            } else {
                return pogs;
            }
        } catch (error) {
            console.error(error);
            return { error: "Internal Server Error." };
        }
    }

    async getAllPogs() {
        try {
            let pogs = await PogDao.getAllPogs();
            if (pogs.length === 0) {
                return { error: 'No pogs found.' };
            } else {
                return pogs;
            }
        } catch (error) {
            console.error(error);
            return { error: 'Internal Server Error.' };
        }
    }

    async createPogs(data: any) {
        if (!data) {
            return { error: "Invalid data." };
        }

        try {
            const pogs = await PogDao.createPog(data);
            return pogs;
        } catch (error) {
            console.error(error);
            return { error: "Internal Server Error." };
        }
    }

    async updatePog(id: number, data: any) {
        if (!id || !data || Object.keys(data).length === 0) {
            return { error: "Invalid data." };
        }

        try {
            const Checkpogs = await PogDao.getPogById(id);
            if (!Checkpogs) {
                return { error: "Pogs not found." };
            }
        } catch (error) {
            console.error(error);
            return { error: "Internal Server Error." };
        }
    }

    async updatePrice() {
        try {
            const pogs = await PogDao.getAllPogs();
            if (pogs.length === 0) {
                return { error: "No pogs found." };
            } else {
                PogDao.updatePrice();
                return { message: "Price updated." };
            }
        } catch (error) {
            console.error(error);
            return { error: "Internal Server Error." };
        }
    }

    async deletePogs(id: number) {
        if (!id) {
            return { error: "Invalid ID." };
        }

        try {
            const check = await PogDao.getPogById(id);

            if (!check) {
                return { error: "Pogs not found." };
            } else {
                const pogsDeleted = await PogDao.deletePog(id);
                return pogsDeleted;
            }
        } catch (error) {
            console.error(error);
            return { error: "Internal Server Error." };
        }
    }
}

export default new pogsService();