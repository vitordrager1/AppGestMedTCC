import React from "react";
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
  Image,
  Button,
  Link,
  HStack,
  Text,
} from "@chakra-ui/react";

import MainMenu from "./MenuComponent";
import AddPaciente from "./AddPaciente";
import { Routes, Route, Navigates } from "react-router-dom";

function Header(props) {
  return (
    <Box p="4" bg="#e6e4dc" w={"100%"} align='center' justify='center'>
      <Flex>
        <Box>
          <MainMenu />
        </Box>
        <Spacer />
        <Box color={"white"} fontFamily={"Arial"} fontSize={30}>
          {props.title}
        </Box>
        <Spacer />
        <Image src='http://127.0.0.1:8082/LogoFarmaciaEscrita.png' alt='Logo da Farmácia Integrado' w={'15%'}/>
          {/* <Menu>
            <MenuButton as={Button} bg="#F54756" color={"white"}>
              Conta
            </MenuButton>
            <MenuList>
              <MenuItem href='/' as={Link}>Sair</MenuItem>
            </MenuList>
          </Menu> */}
      </Flex>
    </Box>
  );
}
export default Header;
