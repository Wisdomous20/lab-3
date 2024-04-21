import pogService from "../service/pogService";
import express from 'express';

class PogsController{

    async getAllPogs(req: express.Request, res: express.Response) {
        try {
            const pogs = await pogService.getAllPogs();
            if ('error' in pogs) {
                res.status(404).send(pogs.error);
            } else {
                res.status(200).send(pogs);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error.');
        }
    }

    async getPogById(req: express.Request, res: express.Response) {
        const id = Number(req.params.id);
        try {
            const pogs = await pogService.getPogsByid(id);
            if ('error' in pogs) {
                res.status(404).send(pogs.error);
            } else {
                res.status(200).send(pogs);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error.');
        }
    }

    async createPog(req: express.Request, res: express.Response) {
        const pog = req.body;
        try {
            const newPog = await pogService.createPogs(pog);
            if ('error' in newPog) {
                res.status(400).send(newPog.error);
            } else {
                res.status(201).send(newPog);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error.');
        }
    }

    async updatePog(req: express.Request, res: express.Response) {
        const id = Number(req.params.id);
        const pog = req.body;
        try {
            const updatedPog = await pogService.updatePog(id, pog);
            if (updatedPog && 'error' in updatedPog) {
                res.status(400).send(updatedPog.error);
            } else {
                res.status(200).send(updatedPog);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error.');
        }
    }

    async updatePrice(req: express.Request, res: express.Response) {
        try {
            const updatedPog = await pogService.updatePrice();
            if ('error' in updatedPog) {
                res.status(400).send(updatedPog.error);
            } else {
                res.status(200).send(updatedPog);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error.');
        }
    }

    async deletePog(req: express.Request, res: express.Response) {
        const id = Number(req.params.id);
        try {
            const deletedPog = await pogService.deletePogs(id);
            if ('error' in deletedPog) {
                res.status(404).send(deletedPog.error);
            } else {
                res.status(200).send(deletedPog);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error.');
        }
    }

    async getPogsByTickerSymbol(req: express.Request, res: express.Response) {
        const tickerSymbol = req.params.tickerSymbol;
        try {
            const pogs = await pogService.getPogsBytickerSymbol(tickerSymbol);
            if ('error' in pogs) {
                res.status(404).send(pogs.error);
            } else {
                res.status(200).send(pogs);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error.');
        }
    }
}

export default new PogsController();