import mongoose, { Document, Model, Schema } from 'mongoose';

interface ICoinData extends Document {
    name: string;
    symbol: string;
    price: number;
    timestamp: number;
}

const coinDataSchema: Schema = new Schema({
    name: { type: String, required: true },
    symbol: { type: String, required: true },
    price: { type: Number, required: true },
    timestamp: { type: Date, required: true },
});

export const CoinData: Model<ICoinData> = mongoose.model<ICoinData>('CoinData', coinDataSchema);
