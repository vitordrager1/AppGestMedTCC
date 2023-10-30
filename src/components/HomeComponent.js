import {Box, Spacer, Flex } from "@chakra-ui/react";
import React from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Calendar from "./CalenderComponent";
function Home(){

    return(
        <Box >
            <Header/>
            <Flex m="10">
                <Spacer/>
                <Box boxShadow={5} borderRadius={5} p={2} bg={"#F57977"}>
                    <Calendar/>
                </Box>
                <Spacer></Spacer>
                <Box bg="#F57977"> 
                    Próximos agendamentos
                </Box>
                <Spacer/>
            </Flex>
            <Footer/>
        </Box>
    )
}

export default Home