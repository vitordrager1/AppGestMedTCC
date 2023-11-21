import { HStack, Box, Text, Link, Flex, Container } from "@chakra-ui/react";
import React from "react";

function Footer() {
  return (
    <Box bg="#F57977" color="white" py="2" mt={140}>
      <Container maxW="container.lg">
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="xl">Farmácia-Escola</Text>
          <Box>
            <Link mr="4" href="sobre">
              Sobre Nós
            </Link>
            <Text>Contato: (99) 99999-9999</Text>
          </Box>
        </Flex>
        <Text mt="4">
          © {new Date().getFullYear()} Todos os direitos reservados.
        </Text>
      </Container>
    </Box>
  );
}

export default Footer;
