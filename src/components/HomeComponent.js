import { VStack, Box, Spacer, Flex } from "@chakra-ui/react";
import React from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Calendar from "./CalenderComponent";
function Home(){

    return(
        <Box>
            <Header/>
            <Flex m="10">
                <Spacer/>
                <Box bg="tomato">
                    <Calendar/>
                </Box>
                <Spacer></Spacer>
                <Box bg="tomato"> 
                    Próximos agendamentos
                </Box>
                <Spacer/>
            </Flex>
            <Footer/>
        </Box>
    )
}

export default Home