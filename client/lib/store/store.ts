import { configureStore } from '@reduxjs/toolkit'
import cryptoDataReducer from "./features/crypto/cryptoSlice"


export const makeStore = () => {
    return configureStore({
        reducer: {
            crypto: cryptoDataReducer
        }
    })
}


// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']