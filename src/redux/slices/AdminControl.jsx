import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    bloggerReply: [],
    loading: false,
    error: null,
};

// Create an async thunk to reply to blogger
export const adminToBloger = createAsyncThunk(
    'admin/adminToBloger',
    async ({ contentBody }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`http://92.113.26.138:8081/api/campaign/request/to-bloger`, contentBody, {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyQGdtYWlsLmNvbSIsImlhdCI6MTcyNzAzNzU3OH0.qniheG9oh3ZJw94BaaxIhVI2ojEDJz30T-unVRZ6QQs`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);
// Create an async thunk to reply to blogger
export const getBloggerReply = createAsyncThunk(
    'admin/getBloggerReply',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://92.113.26.138:8081/api/campaign/admin/response`, {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyQGdtYWlsLmNvbSIsImlhdCI6MTcyNzAzNzU3OH0.qniheG9oh3ZJw94BaaxIhVI2ojEDJz30T-unVRZ6QQs`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);
// Create an async thunk admin reply to client
export const adminToClient = createAsyncThunk(
    'admin/adminToClient',
    async ({ contentBody }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`http://92.113.26.138:8081/api/campaign/response/to-client`, contentBody, {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyQGdtYWlsLmNvbSIsImlhdCI6MTcyNzAzNzU3OH0.qniheG9oh3ZJw94BaaxIhVI2ojEDJz30T-unVRZ6QQs`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);
// Create the slice
const adminControlSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(adminToBloger.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(adminToBloger.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs = action.payload;
            })
            .addCase(adminToBloger.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // get reply 
            .addCase(getBloggerReply.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBloggerReply.fulfilled, (state, action) => {
                state.loading = false;
                state.bloggerReply = action.payload;
            })
            .addCase(getBloggerReply.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // response  from admin to client
            .addCase(adminToClient.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(adminToClient.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs = action.payload;
            })
            .addCase(adminToClient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

// Export the reducer
export default adminControlSlice.reducer;
