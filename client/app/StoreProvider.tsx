"use client"
import { setSymbol } from "@/lib/store/features/crypto/cryptoSlice";
import { AppStore, makeStore } from "@/lib/store/store";
import React, { ReactNode, useRef } from "react";
import { Provider } from "react-redux"

const StoreProvider = ({ children }: { children: ReactNode }) => {

    const storeRef = useRef<AppStore>()
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore()
        try {
            const symbol = window.localStorage.getItem("symbol") || "BTC"
            storeRef.current.dispatch(setSymbol(symbol))
        } catch (error) { }
    }

    return (
        <Provider store={storeRef.current}>
            {children}
        </Provider>
    )

}

export default StoreProvider