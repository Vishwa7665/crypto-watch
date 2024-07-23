import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

export interface CryptoDataState {
    symbol: string;
    cryptoData: { name: string; price: number; timestamp: string }[];
    error: string | null;
}

const initialState: CryptoDataState = {
    symbol: 'BTC',
    cryptoData: [],
    error: null,
};

export const cryptoSlice = createSlice({
    name: 'cryptoData',

    initialState,

    reducers: {
        setCryptoData: (state, action: PayloadAction<{ name: string; price: number; timestamp: string }[]>) => {
            state.cryptoData = action.payload;
            state.error = null;
        },
        setSymbol: (state, action: PayloadAction<string>) => {
            state.symbol = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const { setCryptoData, setSymbol, setError } = cryptoSlice.actions;

export const selectCryptoData = (state: RootState) => state.crypto.cryptoData;
export const selectSymbol = (state: RootState) => state.crypto.symbol;
export const selectError = (state: RootState) => state.crypto.error;

export default cryptoSlice.reducer;
