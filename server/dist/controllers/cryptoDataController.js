"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPriceDataOfSingleCoin = void 0;
const models_1 = require("../dbmodels/models");
const fetchPriceDataOfSingleCoin = async (req, res) => {
    const { symbol } = req.params;
    try {
        if (!symbol) {
            return res.status(400).send({ status: false, message: 'Symbol parameter is required' });
        }
        const prices = await models_1.CoinData.find({ symbol }).sort({ timestamp: -1 }).limit(20);
        if (!prices || prices.length === 0) {
            return res.status(404).send({ status: false, message: 'No price data found for the specified symbol' });
        }
        const transformedArray = prices.map(({ name, price, timestamp }) => ({
            name,
            price,
            timestamp,
        }));
        res.status(200).send({ status: true, prices: transformedArray });
    }
    catch (error) {
        console.error('Error fetching price data:', error);
        res.status(500).send({ status: false, message: 'Internal Server Error' });
    }
};
exports.fetchPriceDataOfSingleCoin = fetchPriceDataOfSingleCoin;
