import { Box, Spacer, Flex } from "@chakra-ui/react";
import React from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Calendar from "./CalenderComponent";
function Home() {
  return (
    <Box>
      <Header title={"Farmácia Escola"} />
      <Box h={"100vh"} mt={10}>
        <Flex m="10">
          <Spacer />
          <Box boxShadow={5} borderRadius={5} p={2} bg={"#F57977"}>
            <Calendar />
          </Box>
          <Spacer></Spacer>
          <Box boxShadow={5} borderRadius={5} bg="#F57977">
            Próximos agendamentos
          </Box>
          <Spacer />
        </Flex>
      </Box>
      <Footer />
    </Box>
  );
}

export default Home;
