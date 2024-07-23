import { Request, Response } from 'express';
import { CoinData } from '../dbmodels/models';
import { CoinDataType } from '../interfaces/CoinDataType';

export const fetchPriceDataOfSingleCoin = async (req: Request, res: Response) => {
    const { symbol } = req.params;

    try {
        if (!symbol) {
            return res.status(400).send({ status: false, message: process.env.PARAMS_NOT_FOUND });
        }

        const prices: CoinDataType[] = await CoinData.find({ symbol }).sort({ timestamp: -1 }).limit(20);

        if (!prices || prices.length === 0) {
            return res.status(404).send({ status: false, message: process.env.DATA_NOT_FOUND });
        }

        const coinData = prices.map(({ name, price, timestamp }) => ({
            name,
            price,
            timestamp,
        }));

        res.status(200).send({ status: true, prices: coinData });
    } catch (error) {
        console.error('Error fetching price data:', error);
        res.status(500).send({ status: false, message: process.env.INTERNAL_SERVER_ERROR });
    }
};
