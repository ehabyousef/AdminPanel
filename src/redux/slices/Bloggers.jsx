import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
    blogs: {
        content: [],   // Assuming the API returns paginated content in a 'content' field
        totalPages: 0, // Assuming the API returns total pages
        totalElements: 0, // Assuming the API returns total elements
    },
    users: {
        content: [],   // Assuming the API returns paginated content in a 'content' field
        totalPages: 0, // Assuming the API returns total pages
        totalElements: 0, // Assuming the API returns total elements
    },
    filterBloggers: null,
    loading: false,
    error: null,
    page: 0,          // Page numbers typically start from 1
    size: 9,
};

// Create an async thunk to fetch blogs
export const fetchBlogs = createAsyncThunk(
    'blogs/fetchBlogs',
    async ({ page = 0, size = 9 }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://92.113.26.138:8081/api/bloger?page=${page}&size=${size}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);
// Create an async thunk to fetch users
export const fetchUsers = createAsyncThunk(
    'blogs/fetchUSers',
    async ({ token, page = 0, size = 9 }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://92.113.26.138:8081/api/users?page=${page}&size=${size}`, {
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
// Create an async thunk to filter blogs
export const fetchFilteredBlogs = createAsyncThunk(
    'blogs/filterBlogs',
    async ({ category, country, type, age }, { rejectWithValue }) => {
        try {
            // Build the query string dynamically
            let query = 'http://92.113.26.138:8081/api/bloger/filter';
            const params = new URLSearchParams();

            if (category) params.append('category', category);
            if (country) params.append('country', country);
            if (type) params.append('type', type);
            if (age) params.append('age', age);

            if (params.toString()) {
                query += `?${params.toString()}`;
            }

            const response = await axios.get(query);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);
// Create the slice
const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        // Reducer to set the current page
        setPage: (state, action) => {
            state.page = action.payload;
        },
        // Reducer to set the page size
        setSize: (state, action) => {
            state.size = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs = action.payload; // Assuming the payload has the full data structure
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch blogs';
            })
            // filter bloggers 
            .addCase(fetchFilteredBlogs.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchFilteredBlogs.fulfilled, (state, action) => {
                state.loading = false
                state.filterBloggers = action.payload
                state.error = null
            })
            .addCase(fetchFilteredBlogs.rejected, (state, action) => {
                state.loading = true
                state.error = action.payload || 'Failed to fetch blogs';
            })
            // get users 
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload; // Assuming the payload has the full data structure
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch blogs';
            })
    },
});

// Export the actions
export const { setPage, setSize } = blogSlice.actions;
export const getFilterBlogger = (state) => state.Bloggers.filterBloggers;
// Export the reducer
export default blogSlice.reducer;
