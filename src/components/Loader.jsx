import React from 'react';
import {Spinner, Text, VStack} from "@chakra-ui/react";

function Loader({status}) {
    if (status === 'loading') {
        return (
            <VStack justifyContent="center" height="100vh">
                <Spinner size="xl" />
                <Text>Loading...</Text>
            </VStack>
        );
    }
    return (
        <></>
    );
}

export default Loader;