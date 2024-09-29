import { configureStore } from "@reduxjs/toolkit";
import blogReducer from './slices/Bloggers';
// import Category from "./slices/Category";
import userReducer from "./slices/GetUser";
import changeStateReducer from './slices/changeStateSlice';
import AdminControl from "./slices/AdminControl";
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
        user: userReducer,
        changeState: changeStateReducer,
        adminControl: AdminControl
    },
});

export default store;
