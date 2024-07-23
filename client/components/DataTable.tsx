"use client"
// components/CryptoDataTable.tsx
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../lib/store/hooks/index';
import { setCryptoData, setError } from '@/lib/store/features/crypto/cryptoSlice';

const CryptoDataTable: React.FC = () => {
    const dispatch = useAppDispatch();
    const { symbol, cryptoData, error } = useAppSelector(state => state.crypto);

    useEffect(() => {

        const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}price/${symbol}`;
        const fetchPrices = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }

                const responseData = await response.json();

                dispatch(setCryptoData(responseData.prices));
            } catch (error) {

                dispatch(setError("Failed to fetch cryptoData from server!"))

            }

        };

        fetchPrices();
        const interval = setInterval(fetchPrices, 5000);

        return () => clearInterval(interval);
    }, [dispatch, symbol]);

    return (
        <>
            {cryptoData.length ?
                (<table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price (USD)</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cryptoData.map((data, index) => (
                            <tr key={index}>
                                <td>{data.name}</td>
                                <td>{data.price}</td>
                                <td>{new Date(data.timestamp).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>) : <div className="loader"></div>
            }
            <div className={`error-message ${!error ? 'hidden' : ''}`}>
                {error}
            </div>
        </>
    );
};

export default CryptoDataTable;
