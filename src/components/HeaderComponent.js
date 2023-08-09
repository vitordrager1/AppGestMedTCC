import React from "react"
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Box,
    Flex,
    Spacer,
    Button,
    HStack,
    Text
} from '@chakra-ui/react'

import  MainMenu from "./MenuComponent";
import AddPaciente from "./AddPaciente";
import { Routes, Route, Link } from "react-router-dom";

function Header (props) {
    return(
        <Box p='4' bg='green.400' w={"100%"}>

            <Flex >
                <Box>
                    <MainMenu/>
                </Box>
                <Spacer/>
                <Box>
                    {props.title}
                </Box>
                <Spacer />
                <Box>
                    <Menu>
                    <MenuButton as={Button} colorScheme='pink'>
                        Conta
                    </MenuButton>
                    <MenuList>
                        
                        <MenuItem>Minha conta</MenuItem>
                        
                        <MenuDivider />
                        <MenuItem>Sair</MenuItem>
                    </MenuList>
                    </Menu>
                </Box>
            </Flex>
        </Box>

    )
}
export default Header