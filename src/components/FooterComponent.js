import { HStack,
Box,
Text,
Link,
Flex,
Container}

from "@chakra-ui/react";
import React from "react";

function Footer (){
    return(
        <Box bg="gray.900" color="white" py="6" >
            <Container maxW="container.lg">
                <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize="xl">Meu Website</Text>
                <Box>
                    <Link mr="4" href="#">Página Inicial</Link>
                    <Link mr="4" href="#">Sobre Nós</Link>
                    <Link href="#">Contato</Link>
                </Box>
                </Flex>
                <Text mt="4">© {new Date().getFullYear()} Todos os direitos reservados.</Text>
            </Container>
        </Box>
    )
}

export default Footer