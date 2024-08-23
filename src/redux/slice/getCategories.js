import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    categories: [],
    status: 'loading',
    categoryFilter: '',
};

export const getDataCategories = createAsyncThunk('items/getCategories', async () => {
    try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
        return response.data.categories;
    } catch (error) {
        throw error;
    }
});

const getCategories = createSlice({
    name: 'items',
    initialState,
    reducers: {
        setFilterByCategory(state, action) {
            state.categoryFilter = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getDataCategories.pending, (state) => {
            state.status = 'loading';
            state.categories = [];
        });
        builder.addCase(getDataCategories.fulfilled, (state, action) => {
            state.status = 'success';
            state.categories = action.payload;
        });
        builder.addCase(getDataCategories.rejected, (state) => {
            state.status = 'error';
            state.categories = [];
        });
    }
});

export const { setFilterByCategory } = getCategories.actions;
export default getCategories.reducer;
