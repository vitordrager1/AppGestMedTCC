import React from "react"
import AddPaciente from "./AddPaciente";
import AddAgendamento from "./AddAgendamento"
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
    Link
  } from '@chakra-ui/react'

  import { ChevronDownIcon,HamburgerIcon } from '@chakra-ui/icons'

function MainNavbar() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [placement, setPlacement] = React.useState('left')
  
    return (
      <>
        
        <Button colorScheme='blue' onClick={onOpen} >
          <Icon as={HamburgerIcon}/>
        </Button>
        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth='1px'>Menu</DrawerHeader>
            <DrawerBody>
              <Flex alignItems='left' flexDirection='column'>
                <Stack spacing={30}>
                  <Menu padding="">
                    <MenuItem textDecoration={"none"} _hover={{ textDecoration: 'none'}} as={Link} href="/">
                      
                      Início
                      
                    </MenuItem>
                  </Menu>
                  <Menu padding="">
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                      Cadastrar
                    </MenuButton>
                    <MenuList>
                      <AddPaciente/>
                      <AddAgendamento/>
                    </MenuList>
                  </Menu>
                  
                  <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                      Consultar
                    </MenuButton>
                    <MenuList>
                      <MenuItem as={Link} textDecoration="none" _hover={{ textDecoration: 'none' }} href="/pacientes">
                        Pacientes
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Stack>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    )
  }

  export default MainNavbar