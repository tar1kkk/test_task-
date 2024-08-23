import React from 'react';
import {Button, Card, CardBody, CardFooter, CardHeader, Heading, SimpleGrid, Text} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import {useDispatch} from "react-redux";
import {setListFav} from "../redux/slice/recipesReducer";

function RecipeCard({ recipes, categoryFilter }) {
    const dispatch = useDispatch();
    return (
        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(260px, 1fr))'>
            {recipes.map((item) => (
                <Card key={item.idMeal}>
                    <CardHeader>
                        <Heading size='sm'>{item.strMeal}</Heading>
                    </CardHeader>
                    <CardBody>
                        {item.strArea && !categoryFilter && (
                            <Text>Category : {categoryFilter ? categoryFilter : item.strCategory}</Text>
                        )}
                        {item.strArea && !categoryFilter && (
                            <Text>Area: {item.strArea}</Text>
                        )}
                        <img src={item.strMealThumb} alt={item.strMeal} />
                    </CardBody>
                    <CardFooter>
                        <Button><NavLink to={`product/${item.idMeal}`}>View here</NavLink></Button>
                        <Button onClick={()=> dispatch(setListFav(item))}>Add to fav</Button>
                    </CardFooter>
                </Card>
            ))}
        </SimpleGrid>
    );
}

export default RecipeCard;
