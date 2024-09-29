import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
    isAdmin: localStorage.getItem('isAdmin') || null,
    status: "idle",
    error: null,
};

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
            state.status = "idle";
            state.error = null;
            localStorage.removeItem('isAdmin');
        },
    },
    extraReducers: (builder) => {
        builder
        // Fetch User
    },
});

// Export actions
export const { logoutUser, checkAdmin } = userSlice.actions;
// Selectors
export const getAdminLoged = (state) => state.user.isAdmin;  // Selector for token
export const userStatus = (state) => state.user.status;
export const userError = (state) => state.user.error;

export default userSlice.reducer;