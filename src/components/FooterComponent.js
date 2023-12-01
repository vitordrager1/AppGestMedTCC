import { HStack, Box, Text, Link, Flex, Container } from "@chakra-ui/react";
import React from "react";

function Footer() {
  return (
    <Box bg="#e6e4dc" color="#30302f" py="3vh" mt={'22vh'}>
      <Container maxW="container.lg">
        <Flex justifyContent="center" alignItems="center">
          <Text fontSize="xl">Farmácia-Escola Integrado - © {new Date().getFullYear()} Todos os direitos reservados.</Text>
        </Flex>
      </Container>
    </Box>
  );
}

export default Footer;
