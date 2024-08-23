import React, { useState, useEffect, useCallback } from 'react';
import { Input } from "@chakra-ui/react";
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';
import { getData } from "../redux/slice/recipesReducer";

function SearchBar({recipes}) {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    const debouncedSearch = useCallback(
        debounce((term) => {
            dispatch(getData({ searchTerm: term, category: '' }));
        }, 1000),
        []
    );

    useEffect(() => {
        if (searchTerm.trim() !== '') {
            debouncedSearch(searchTerm);
        }
        return () => {
            debouncedSearch.cancel();
        };
    }, [searchTerm, debouncedSearch]);

    const handleChange = (e) => {
        e.preventDefault();
        setSearchTerm(e.target.value);
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
