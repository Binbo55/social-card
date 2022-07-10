
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    revert: [],
};


const RevertSlice = createSlice({
    name: 'revert',
    initialState,
    reducers: {
        addRevert: (state, action) => {
            state.revert.unshift(action.payload);
        },
        removeRevert: (state, action) => {
            state.revert.shift(action.payload)
        }
    },
});


export const selectRevert = (state) => state.revert.revert;
export const { addRevert, removeRevert } = RevertSlice.actions;
export default RevertSlice.reducer;