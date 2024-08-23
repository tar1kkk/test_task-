import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    recipes: [],
    selectedRecipes: [],
    status: 'loading',
    categoryFilter: '',
    currentPage: 1,
    recipesPerPage: 5,
    list: [],
};

export const getData = createAsyncThunk('items/getData', async ({searchTerm, category}) => {
    try {
        let url;
        if (category) {
            url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
        } else if (searchTerm) {
            url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;
        } else {
            url = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
        }

        const response = await axios.get(url);
        return response.data.meals;
    } catch (error) {
        throw error;
    }
});

const recipesReducer = createSlice({
    name: 'items',
    initialState,
    reducers: {
        setPage(state, action) {
            state.currentPage = action.payload;
        },
        setCategoryFilter(state, action) {
            state.categoryFilter = action.payload;
        },
        setListFav(state, action) {
            const recipeExists = state.list.some(item => item.idMeal === action.payload.idMeal);
            if (!recipeExists) {
                state.list.push(action.payload);
            }
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getData.pending, (state) => {
            state.status = 'loading';
            state.recipes = [];
        });
        builder.addCase(getData.fulfilled, (state, action) => {
            state.status = 'success';
            state.recipes = action.payload || [];
            state.currentPage = 1;
        });
        builder.addCase(getData.rejected, (state) => {
            state.status = 'error';
            state.recipes = [];
        });
    }
});

export const {setPage, setCategoryFilter, setListFav} = recipesReducer.actions;
export default recipesReducer.reducer;
