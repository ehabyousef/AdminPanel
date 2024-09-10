// slices/changeStateSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sidebarShow: true,
    theme: 'light',
};

const changeStateSlice = createSlice({
    name: 'changeState',
    initialState,
    reducers: {
        set(state, action) {
            return { ...state, ...action.payload };
        },
    },
});

export const { set } = changeStateSlice.actions;
export default changeStateSlice.reducer;