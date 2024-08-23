import React, {useState, useEffect, useCallback} from 'react';
import {Input} from "@chakra-ui/react";
import {useDispatch} from 'react-redux';
import debounce from 'lodash.debounce';
import {getData, setSearch} from "../redux/slice/recipesReducer";

function SearchBar({recipes}) {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    const debouncedDispatch = useCallback(
        debounce((value) => {
            dispatch(setSearch(value));
        }, 1000),
        [dispatch]
    );

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        debouncedDispatch(value);
    };

    return (
        <Input
            placeholder='Search...'
            value={searchTerm}
            onChange={handleChange}
        />
    );
}

export default SearchBar;
