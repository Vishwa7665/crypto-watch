"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPriceAndSaveToDb = void 0;
// import fetch from 'node-fetch';
const models_1 = require("../dbmodels/models");
function getName(symbol) {
    switch (symbol) {
        case 'ETH':
            return 'Ethereum';
        case 'BTC':
            return 'Bitcoin';
        case 'SOL':
            return 'Solana';
        case 'XRP':
            return 'Xrp';
        case 'BNB':
            return 'Bnb';
        default:
            throw new Error(`Unknown symbol: ${symbol}`);
    }
}
const saveToDatabase = async (data) => {
    const savePromises = data.map(async (element) => {
        const name = getName(element.code);
        const coinData = new models_1.CoinData({
            name: name,
            symbol: element.code,
            price: element.rate.toFixed(3),
            timestamp: Date.now(),
        });
        await coinData.save();
    });
    await Promise.all(savePromises);
};
const fetchPriceAndSaveToDb = async () => {
    try {
        const response = await fetch('https://api.livecoinwatch.com/coins/map', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'a7214b1c-ccf9-43b8-9437-71ee960eab10',
            },
            body: JSON.stringify({
                codes: ['ETH', 'BTC', 'BNB', 'XRP', 'SOL'],
                currency: 'USD',
                sort: 'rank',
                order: 'ascending',
                offset: 0,
                limit: 0,
                meta: false,
            }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        await saveToDatabase(jsonData);
    }
    catch (error) {
        console.error('ERROR:', error);
    }
};
exports.fetchPriceAndSaveToDb = fetchPriceAndSaveToDb;
