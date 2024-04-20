import express from 'express';
import { router } from './routes/routes';

export const app = express();
app.use('/', router)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router)

function startServer() {
    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    });
}

startServer();