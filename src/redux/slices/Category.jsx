import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
const initialState = {
    category: {
        content: [],   // Assuming the API returns paginated content in a 'content' field
        totalPages: 0, // Assuming the API returns total pages
        totalElements: 0, // Assuming the API returns total elements
    },
    loading: false,
    error: null,
    page: 0,
    size: 9
}
export const fetchCategory = createAsyncThunk(
    'bloggers/fetchCategory',
    async ({ category, page, size }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://92.113.26.138:8081/api/category/${category}`, {
                params: {
                    page,
                    size
                }
            });
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setSize: (state, action) => {
            state.page = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategory.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchCategory.fulfilled, (state, action) => {
                state.loading = false
                state.category = action.payload
            })
            .addCase(fetchCategory.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})
export const { setPtage, setSize } = categorySlice.actions
export default categorySlice.reducer