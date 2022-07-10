import { configureStore } from "@reduxjs/toolkit";
import CardSlice from '../components/CardSlice';
import RevertSlice from "../components/RevertSlice";

export const store = configureStore({
    reducer: {
        posts: CardSlice,
        revert: RevertSlice
    },
});