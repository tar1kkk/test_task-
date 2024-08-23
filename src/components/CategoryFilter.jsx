import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from "@chakra-ui/react";
import { setCategoryFilter, getData } from "../redux/slice/recipesReducer";

function CategoryFilter({ categories }) {
    const dispatch = useDispatch();
    const categoryFilter = useSelector((state) => state.recipesReducer.categoryFilter);

    const handleChange = (e) => {
        const selectedCategory = e.target.value;
        dispatch(setCategoryFilter(selectedCategory));
        dispatch(getData({ searchTerm: '', category: selectedCategory }));
    };

    return (
        <Select placeholder="Select category" value={categoryFilter} onChange={handleChange}>
            {categories.map((category) => (
                <option key={category.idCategory} value={category.strCategory}>
                    {category.strCategory}
                </option>
            ))}
        </Select>
    );
}

export default CategoryFilter;
