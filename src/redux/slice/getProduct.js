import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    product: {},
    status: null,
};

export const getProductById = createAsyncThunk('product/getProductById', async (id) => {
    try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        return response.data.meals[0];
    } catch (error) {
        throw error;
    }
});

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProductById.pending, (state) => {
            state.status = 'loading';
            state.product = {};
        });
        builder.addCase(getProductById.fulfilled, (state, action) => {
            state.status = 'success';
            state.product = action.payload;
        });
        builder.addCase(getProductById.rejected, (state) => {
            state.status = 'error';
            state.product = {};
        });
    }
});

export default productSlice.reducer;
