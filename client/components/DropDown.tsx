"use client"
import React from "react";
import { useAppDispatch, useAppSelector } from '../lib/store/hooks/index';
import { setSymbol } from "@/lib/store/features/crypto/cryptoSlice";
import { CRYPTO_OPTIONS } from '../app/data/cryptoOptions';

const DropDown = () => {
    const dispatch = useAppDispatch()
    const symbol = useAppSelector(state => state.crypto.symbol)

    const handleChangeSymbol = (event: { target: { value: any; }; }) => {

        const newSymbol = event.target.value;

        window.localStorage.setItem("symbol", newSymbol)
        dispatch(setSymbol(newSymbol));

    };

    return (
        <div className="form-select">
            <label htmlFor="symbol">Select Cryptocurrency: </label>
            <select id="symbol" value={symbol} onChange={handleChangeSymbol}>
                {CRYPTO_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default DropDown