import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    blogger: JSON.parse(localStorage.getItem('blogger')) || null,
    token: localStorage.getItem('token') || null,
    updatedUser: null,
    status: "idle",
    error: null,
};

export const fetchUser = createAsyncThunk(
    "user/fetchUser",
    async ({ token, email }, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/profile?email=${email}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data);
            return response.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    }
);
export const fetchBlogger = createAsyncThunk(
    "user/fetchBlogger",
    async ({ token, email }, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/profile/bloger?email=${email}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data);
            return response.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
        },
        logoutUser(state) {
            state.user = null;
            state.blogger = null;
            state.token = null;
            state.updatedUser = null;
            state.status = "idle";
            state.error = null;
            localStorage.removeItem('user');
            localStorage.removeItem('blogger');
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch User
            .addCase(fetchUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload;
                state.error = null;
                localStorage.setItem('user', JSON.stringify(action.payload));
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || action.error.message;
            })
            // Fetch Blogger
            .addCase(fetchBlogger.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchBlogger.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.blogger = action.payload;
                state.error = null;
                localStorage.setItem('blogger', JSON.stringify(action.payload));
            })
            .addCase(fetchBlogger.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || action.error.message;
            })
    },
});

// Export actions
export const { setToken, logoutUser } = userSlice.actions;

// Selectors
export const getLoggedUser = (state) => state.user.user;
export const getLoggedBlogger = (state) => state.user.blogger;
export const getToken = (state) => state.user.token;  // Selector for token
export const userStatus = (state) => state.user.status;
export const userError = (state) => state.user.error;

export default userSlice.reducer;