import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    bloggerReply: [],
    categories: [],
    paid: [],
    loading: false,
    error: null,
};

// Create an async thunk to reply to blogger
export const adminToBloger = createAsyncThunk(
    'admin/adminToBloger',
    async ({ contentBody, TheToken }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`http://92.113.26.138:8081/api/campaign/request/to-bloger`, contentBody, {
                headers: {
                    Authorization: `Bearer ${TheToken}`,
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
    async ({ TheToken }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://92.113.26.138:8081/api/campaign/admin/response`, {
                headers: {
                    Authorization: `Bearer ${TheToken}`,
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
    async ({ contentBody, TheToken }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`http://92.113.26.138:8081/api/campaign/response/to-client`, contentBody, {
                headers: {
                    Authorization: `Bearer ${TheToken}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);
// Create an async thunk to fetch paid to blogger
export const clientPaid = createAsyncThunk(
    'campagins/clientPaid',
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://92.113.26.138:8081/api/bloger/paid-campaign?blogerId=${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);
// Create an async thunk to get categories
export const getAllCategories = createAsyncThunk(
    'admin/getAllCategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://92.113.26.138:8081/api/categories`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

// Create an async thunk to update category
export const updateCategory = createAsyncThunk(
    'admin/updateCategory',
    async ({ id, categoryData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`http://92.113.26.138:8081/api/categories/${id}`, categoryData);
            return response.data; // Return the updated category data
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

// Create an async thunk to add category
export const addCategory = createAsyncThunk(
    'admin/addCategory',
    async ({ categoryData }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`http://92.113.26.138:8081/api/categories`, categoryData);
            return response.data; // Return the newly created category
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

// Create an async thunk to delete category
export const deleteCategory = createAsyncThunk(
    'admin/deleteCategory',
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`http://92.113.26.138:8081/api/categories/${id}`);
            return id; // Return the ID of the deleted category
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
            // Get reply 
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
            // Response from admin to client
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
            // get paid
            .addCase(clientPaid.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(clientPaid.fulfilled, (state, action) => {
                state.loading = false;
                state.paid = action.payload;
            })
            .addCase(clientPaid.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Get categories
            .addCase(getAllCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update category
            .addCase(updateCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.categories.findIndex(cat => cat.id === action.payload.id);
                if (index !== -1) {
                    state.categories[index] = action.payload; // Update the specific category
                }
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Add category
            .addCase(addCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories.push(action.payload); // Add the new category
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete category
            .addCase(deleteCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = state.categories.filter(cat => cat.id !== action.payload); // Remove the deleted category
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Export the reducer and selector
export const allCategories = (state) => state.adminControl.categories;
export const paidCampagins = (state) => state.adminControl.paid
export default adminControlSlice.reducer;
