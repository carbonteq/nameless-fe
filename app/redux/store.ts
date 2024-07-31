"use client"
import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./slices/authSlice"
import validationSchemaSlice from "./slices/validationSchemaSlice";



export const store = configureStore({
    reducer: {
        auth: authSlice,
        validationSchema: validationSchemaSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;