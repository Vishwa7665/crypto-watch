// import fetch from 'node-fetch';
import { CoinData } from '../dbmodels/models';


function getName(symbol: string): string {
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

const saveToDatabase = async (data: any[]) => {
    const savePromises = data.map(async (element) => {
        const name = getName(element.code);
        const coinData = new CoinData({
            name: name,
            symbol: element.code,
            price: element.rate.toFixed(3),
            timestamp: Date.now(),
        });
        await coinData.save();
    });

    await Promise.all(savePromises);
};

export const fetchPriceAndSaveToDb = async () => {

    const apiKey = process.env.LIVECOINWATCH_API_KEY;
    const endpoint = process.env.LIVECOINWATCH_ENDPOINT

    if (!apiKey || !endpoint) {
        throw new Error('LIVECOINWATCH_API_KEY and LIVECOINWATCH_ENDPOINT is not defined');
    }

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
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
            throw new Error(process.env.NETWORK_RESPONSE_ERROR);
        }

        const jsonData: any = await response.json();

        await saveToDatabase(jsonData);

    } catch (error) {
        console.error('ERROR:', error);
    }
};
