import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Flex, Text, Image, Link, List, ListItem } from "@chakra-ui/react";

function SelectedIngredientsPage() {
    const {list} = useSelector((state) => state.recipesReducer);

    const getIngredients = (recipe) => {
        let ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = recipe[`strIngredient${i}`];
            const measure = recipe[`strMeasure${i}`];
            if (ingredient && ingredient.trim() !== "") {
                ingredients.push(`${ingredient} - ${measure}`);
            }
        }
        return ingredients;
    };

    return (
        <Flex direction="column" minHeight="100vh" p={4}>
            <Text fontSize="2xl" mb={4}>Selected Recipes</Text>
            {list.length === 0 ? (
                <Text>No recipes selected</Text>
            ) : (
                list.map((recipe) => (
                    <Box key={recipe.idMeal} borderWidth="1px" borderRadius="lg" p={4} mb={4}>
                        <Flex direction={{ base: 'column', md: 'row' }}>
                            <Image
                                boxSize="150px"
                                objectFit="cover"
                                src={recipe.strMealThumb}
                                alt={recipe.strMeal}
                                mr={{ base: 0, md: 4 }}
                                mb={{ base: 4, md: 0 }}
                            />
                            <Flex direction="column" flex="1">
                                <Text fontSize="xl" fontWeight="bold">{recipe.strMeal}</Text>
                                <Text mt={2}><strong>Instructions:</strong> {recipe.strInstructions}</Text>
                                <Text mt={2}><strong>Ingredients:</strong></Text>
                                <List spacing={2}>
                                    {getIngredients(recipe).map((ingredient, index) => (
                                        <ListItem key={index}>{ingredient}</ListItem>
                                    ))}
                                </List>
                                <Text mt={2}><strong>Category:</strong> {recipe.strCategory}</Text>
                                <Text mt={2}><strong>Area:</strong> {recipe.strArea}</Text>
                                {recipe.strTags && <Text mt={2}><strong>Tags:</strong> {recipe.strTags}</Text>}
                                <Text mt={2}><strong>Source:</strong> <Link href={recipe.strSource} isExternal>{recipe.strSource}</Link></Text>
                                {recipe.strYoutube && <Text mt={2}><strong>Video:</strong> <Link href={recipe.strYoutube} isExternal>Watch Video</Link></Text>}
                            </Flex>
                        </Flex>
                    </Box>
                ))
            )}
        </Flex>
    );
}

export default SelectedIngredientsPage;
