import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    admin: JSON.parse(localStorage.getItem('admin')) || {},
    isAdmin: localStorage.getItem('isAdmin') || null,
    status: "idle",
    error: null,
};

// Thunk for admin login
export const adminLogin = createAsyncThunk(
    'user/adminLogin',
    async ({ formData }, { rejectWithValue }) => {
        try {
            const response = await axios.post('https://92.113.26.138:8081/api/signin/admin', formData);
            console.log("API response:", response.data);  // Log for debugging
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

// User Slice
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        checkAdmin(state, action) {
            state.isAdmin = action.payload;
            localStorage.setItem('isAdmin', action.payload);
        },
        logoutUser(state) {
            state.isAdmin = null;
            state.admin = {};
            state.status = "idle";
            state.error = null;
            localStorage.removeItem('isAdmin');
            localStorage.removeItem('admin');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(adminLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(adminLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.admin = action.payload;
                state.isAdmin = action.payload.token || '';  // Ensure token is captured
                localStorage.setItem('isAdmin', state.isAdmin);  // Save in localStorage
                localStorage.setItem('admin', JSON.stringify(action.payload))
            })
            .addCase(adminLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Export actions
export const { logoutUser, checkAdmin } = userSlice.actions;

// Selectors
export const getAdmin = (state) => state.user.admin;
export const getAdminLoged = (state) => state.user.isAdmin;
export const userStatus = (state) => state.user.status;
export const userError = (state) => state.user.error;

export default userSlice.reducer;
