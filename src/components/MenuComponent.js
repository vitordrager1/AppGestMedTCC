import React from "react";
import AddPaciente from "./AddPaciente";
import AddAgendamento from "./AddAgendamento";
import AddTipoAtend from "./AddTipoAtendimento";
import PainelAdministrador from "./PainelAdministrador";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  useDisclosure,
  Button,
  VStack,
  Icon,
  HStack,
  Flex,
  Spacer,
  Divider,
  Link,
  Center,
} from "@chakra-ui/react";

import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";

function MainNavbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = React.useState("left");

  return (
    <>
      <Button bg="#02E09D" onClick={onOpen} color={"white"}>
        <Icon as={HamburgerIcon} />
      </Button>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay/>
        <DrawerContent bg={"#f7f6f0"}>
          <DrawerCloseButton color={"#30302f"} />
          <DrawerHeader borderBottomWidth="1px" borderColor={"#30302f"}>
            Menu
          </DrawerHeader>
          <DrawerBody>
            <Flex alignItems="left" flexDirection="column">
              <Stack spacing={30} >
                <Menu>
                  <MenuItem
                    float={"center"}
                    borderRadius={5}
                    color={"#30302f"}
                    bg={"#02E09D"}
                    textDecoration={"none"}
                    _hover={[{ textDecoration: "none" }, { color: "white" }]}
                    as={Link}
                    href="/home"
                    display="flex" // Tornar o conteúdo flexível
                    justifyContent={"center"}
                    fontWeight='semibold'
                  >
                    Início
                  </MenuItem>
                </Menu>
                <Menu>
                  <MenuItem
                    float={"center"}
                    borderRadius={5}
                    color={"#30302f"}
                    bg={"#02E09D"}
                    textDecoration={"none"}
                    _hover={[{ textDecoration: "none" }, { color: "white" }]}
                    as={Link}
                    href="painel"
                    display="flex" // Tornar o conteúdo flexível
                    justifyContent={"center"}
                    fontWeight='semibold'
                  >
                    Painel do administrador
                  </MenuItem>
                </Menu>
                <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />} color={"#30302f"} bg={"#02E09D"}>
                    Cadastrar
                  </MenuButton>
                  <MenuList>
                    <AddPaciente />
                    <AddAgendamento />
                  </MenuList>
                </Menu>

                <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />} color={"#30302f"} bg={"#02E09D"}>
                    Consultar
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      as={Link}
                      textDecoration="none"
                      _hover={{ textDecoration: "none" }}
                      href="/pessoas"
                    >
                      Pacientes
                    </MenuItem>
                    <MenuItem
                      as={Link}
                      textDecoration="none"
                      _hover={{ textDecoration: "none" }}
                      href="/agendamentos"
                    >
                      Agendamentos
                    </MenuItem>
                    <MenuItem
                      as={Link}
                      textDecoration="none"
                      _hover={{ textDecoration: "none" }}
                      href="/atendimento"
                    >
                      Atendimentos
                    </MenuItem>
                  </MenuList>
                </Menu>
                <Menu>
                  <MenuItem
                    float={"center"}
                    borderRadius={5}
                    color={"#30302f"}
                    bg={"#02E09D"}
                    textDecoration={"none"}
                    _hover={[{ textDecoration: "none" }, { color: "white" }]}
                    as={Link}
                    href="/"
                    display="flex" // Tornar o conteúdo flexível
                    justifyContent={"center"}
                    fontWeight='semibold'
                  >
                    Sair
                  </MenuItem>
                </Menu>
              </Stack>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default MainNavbar;
