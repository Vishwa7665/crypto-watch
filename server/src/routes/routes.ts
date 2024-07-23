import express from 'express';
import { fetchPriceDataOfSingleCoin } from '../controllers/cryptoDataController';

const router = express.Router();

router.get('/price/:symbol', fetchPriceDataOfSingleCoin);

export default router;
