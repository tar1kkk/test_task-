
import {configureStore} from "@reduxjs/toolkit";
import recipesReducer from "./slice/recipesReducer";
import getCategories from "./slice/getCategories";
import getProduct from "./slice/getProduct";


const store = configureStore({
    reducer : {
        recipesReducer,
        getCategories,
        getProduct
    }
})

export default store;