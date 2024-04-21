import { Router } from 'express';
import PogsController from '../../controller/PogsController';

export const pogsRouter = Router()

pogsRouter.get('/api', PogsController.getAllPogs);
pogsRouter.get('/api/:id', PogsController.getPogById);
pogsRouter.get('/api-get-ticker-symbol', PogsController.getPogsByTickerSymbol);
pogsRouter.post('/api', PogsController.createPog);
pogsRouter.put('/api:id', PogsController.updatePog);
pogsRouter.patch('/api/update-price', PogsController.updatePrice);
pogsRouter.delete('api/:id', PogsController.deletePog);

