import { configureStore } from "@reduxjs/toolkit";
import blogReducer from './slices/Bloggers';
import Category from "./slices/Category";
import userReducer from "./slices/GetUser";
import changeStateReducer from './slices/changeStateSlice';
const initialState = {
    sidebarShow: true,
    theme: 'light',
}

const changeState = (state = initialState, { type, ...rest }) => {
    switch (type) {
        case 'set':
            return { ...state, ...rest }
        default:
            return state
    }
}

const store = configureStore({
    reducer: {
        Bloggers: blogReducer,
        Category: Category,
        user: userReducer,
        changeState: changeStateReducer,
    },
});

export default store;
