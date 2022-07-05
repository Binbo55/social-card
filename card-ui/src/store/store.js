import { configureStore } from "@reduxjs/toolkit";
import CardSlice from '../components/CardSlice';

export const store = configureStore({
    reducer: {
        posts: CardSlice,
    },
});