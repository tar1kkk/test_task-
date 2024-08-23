import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Button, HStack, IconButton } from "@chakra-ui/react";
import { setPage } from "../redux/slice/recipesReducer";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

function Pagination({ totalRecipes, recipesPerPage, currentPage }) {
    const dispatch = useDispatch();
    const totalPages = Math.ceil(totalRecipes / recipesPerPage);

    const handlePageChange = (pageNumber) => {
        dispatch(setPage(pageNumber));
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };

    const renderPageNumbers = () => {
        if (totalPages <= 10) {
            return Array.from({ length: totalPages }, (_, index) => (
                <Button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    isActive={index + 1 === currentPage}
                >
                    {index + 1}
                </Button>
            ));
        }

        const pages = [];

        pages.push(
            <Button
                key={1}
                onClick={() => handlePageChange(1)}
                isActive={1 === currentPage}
            >
                1
            </Button>
        );

        if (currentPage > 4) {
            pages.push(<span key="ellipsis-start">…</span>);
        }

        let startPage = Math.max(2, currentPage - 3);
        let endPage = Math.min(totalPages - 1, currentPage + 3);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <Button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    isActive={i === currentPage}
                >
                    {i}
                </Button>
            );
        }

        if (currentPage < totalPages - 3) {
            pages.push(<span key="ellipsis-end">…</span>);
        }

        pages.push(
            <Button
                key={totalPages}
                onClick={() => handlePageChange(totalPages)}
                isActive={totalPages === currentPage}
            >
                {totalPages}
            </Button>
        );

        return pages;
    };

    return (
        <HStack justify="center" mt={4}>
            <IconButton
                icon={<ArrowLeftIcon />}
                onClick={handlePrevPage}
                isDisabled={currentPage === 1}
            />
            {renderPageNumbers()}
            <IconButton
                icon={<ArrowRightIcon />}
                onClick={handleNextPage}
                isDisabled={currentPage === totalPages}
            />
        </HStack>
    );
}

export default Pagination;
