import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getData, setCategoryFilter } from "../redux/slice/recipesReducer";
import { getDataCategories } from "../redux/slice/getCategories";
import CategoryFilter from "../components/CategoryFilter";
import RecipeCard from "../components/RecipeCard";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import {Flex, Box, Button} from "@chakra-ui/react";
import SearchBar from "../components/SearchBar";
import {NavLink} from "react-router-dom";

function RecipesListPage() {
    const dispatch = useDispatch();
    const { recipes, status, currentPage, recipesPerPage,search } = useSelector((state) => state.recipesReducer);
    const { categories } = useSelector((state) => state.getCategories);

    useEffect(() => {
        dispatch(getDataCategories());
        dispatch(getData({ category: '' }));
    }, [dispatch]);

    const filteredRecipes = recipes.filter((recipe) =>
        recipe.strMeal.toLowerCase().includes(search.toLowerCase())
    );

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;

    const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    console.log(currentRecipes);

    return (
        <Flex direction="column" minHeight="100vh">
            <Box flex="1">
                <Loader status={status} />
                {status !== 'loading' && (
                    <>
                        <Flex style={{ margin: '20px 0' }}>
                            <SearchBar recipes={recipes}  />
                            <CategoryFilter categories={categories} />
                            <Button><NavLink to={`/list`}>Fav</NavLink></Button>
                        </Flex>
                        <hr />
                        <RecipeCard recipes={currentRecipes} />
                    </>
                )}
            </Box>
            <Box mt="auto" py={4}>
                <Pagination
                    totalRecipes={recipes ? recipes.length : 0}
                    recipesPerPage={recipesPerPage}
                    currentPage={currentPage}
                />
            </Box>
        </Flex>
    );
}

export default RecipesListPage;
