import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, Image, Heading, Text, SimpleGrid, Badge, VStack, Spinner, Alert, AlertIcon, Flex, Button } from "@chakra-ui/react";
import { getProductById } from "../redux/slice/getProduct";
import Loader from "../components/Loader";

function RecipeDetailPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { product, status } = useSelector((state) => state.getProduct);

    useEffect(() => {
        if (id) {
            dispatch(getProductById(id));
        }
    }, [dispatch, id]);

    if (status === 'loading') {
        return <Loader status={status} />;
    }

    if (status === 'error') {
        return (
            <Alert status="error" justifyContent="center" height="100vh">
                <AlertIcon />
                Error loading product
            </Alert>
        );
    }

    if (!product || !product.strMeal) {
        return (
            <Alert status="warning" justifyContent="center" height="100vh">
                <AlertIcon />
                Product not found
            </Alert>
        );
    }

    return (
        <Box p={5}>
            <Flex direction={{ base: 'column', md: 'row' }} align="center" mb={4}>
                <Box flex="1">
                    <Heading mb={4} textAlign={{ base: 'center', md: 'left' }}>{product.strMeal}</Heading>
                    <Badge colorScheme="green" mb={4}>{product.strCategory}</Badge>
                    <Text fontSize="lg" mb={4}>{product.strInstructions}</Text>
                </Box>
                <Image
                    src={product.strMealThumb}
                    alt={product.strMeal}
                    boxSize="300px"
                    borderRadius="lg"
                    ml={{ base: 0, md: 6 }}
                    mt={{ base: 4, md: 0 }}
                />
            </Flex>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={4}>
                {Array.from({ length: 20 }, (_, i) => (
                    product[`strIngredient${i + 1}`] && (
                        <Box key={i} borderWidth="1px" borderRadius="lg" overflow="hidden" p={3}>
                            <Text fontWeight="bold">{product[`strIngredient${i + 1}`]}</Text>
                            <Text>{product[`strMeasure${i + 1}`]}</Text>
                        </Box>
                    )
                ))}
            </SimpleGrid>

            {product.strYoutube && (
                <Box mt={4} textAlign="center">
                    <Heading as="h4" size="md" mb={2}>Watch on YouTube</Heading>
                    <Button
                        as="a"
                        href={product.strYoutube}
                        target="_blank"
                        rel="noopener noreferrer"
                        colorScheme="teal"
                        variant="solid"
                    >
                        Watch Recipe Video
                    </Button>
                </Box>
            )}
        </Box>
    );
}

export default RecipeDetailPage;
