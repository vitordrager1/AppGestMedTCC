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
  Button,
  HStack,
  Text,
} from "@chakra-ui/react";

import MainMenu from "./MenuComponent";
import AddPaciente from "./AddPaciente";
import { Routes, Route, Link } from "react-router-dom";

function Header(props) {
  return (
    <Box p="4" bg="#F57977" w={"100%"}>
      <Flex>
        <Box>
          <MainMenu />
        </Box>
        <Spacer />
        <Box color={"white"} fontFamily={"Arial"} fontSize={30}>
          {props.title}
        </Box>
        <Spacer />
        <Box>
          <Menu>
            <MenuButton as={Button} bg="#F54756" color={"white"}>
              Conta
            </MenuButton>
            <MenuList>
              <MenuItem>Sair</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Box>
  );
}
export default Header;
