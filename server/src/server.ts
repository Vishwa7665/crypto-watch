import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fetchPriceAndSaveToDb } from './utils/fetchAndSaveCryptoData';
import routes from './routes/routes';

dotenv.config();
dotenv.config({ path: 'static.env' });

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3001;
const mongodbUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/CryptoWatch';

mongoose
    .connect(mongodbUrl, {})
    .then(() => {
        console.log('Connected to database');
    })
    .catch((err) => {
        console.error('Error in database connection:', err);
    });

app.use('/', routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send(process.env.INTERNAL_SERVER_ERROR);
});

// Starts the server
app.listen(port, () => {
    console.log('Server started listening on', port);
});

setInterval(fetchPriceAndSaveToDb, 5000);

export default app;
