import { Box, Spacer, Flex, AbsoluteCenter, Image, Text, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import InputMask from "react-input-mask";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import {
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalFooter,
    ModalOverlay,
	Button,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	Center,
	MenuItem,
	Textarea,
	FormErrorMessage,
	FormHelperText,
} from "@chakra-ui/react";

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { isOpen, onOpen, onClose } = useDisclosure()
	const isErrorEmail = (email === "")
    const isErrorPassword = (password === "")
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const onChangeEmail = (val) => {
        setEmail(val.target.value)    
    }

    const onChangePassword = (val) => {
        setPassword(val.target.value)    
    }

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const validateUser = () => {
        if(email == 'teste@gmail.com' && password == '123456') {
            navigate("/home")
        } else {
            openModal()
        }
    }

    return (
    <Box bg="#f7f6f0" p="4" minH="100vh">
        <AbsoluteCenter>
            <Flex bg="#e6e4dc"  h={'60vh'} w={'350px'} borderRadius="10" alignItems="center" justifyContent="center" flexDirection="column" >
                <Image src='http://127.0.0.1:8080/LogoFarmaciaEscrita2.png' alt='Logo da Farmácia Integrado' pb='5'/>
                {/* <Text fontSize="lg" fontWeight="bold">Farmácia Escola Integrado</Text> */}
                <FormControl pl="5" pr="5" pb="5">
                    <FormLabel>E-mail</FormLabel>
                    <Input type="text" placeholder="E-mail"onChange={onChangeEmail} borderColor={'#30302f'}/>
                    {isErrorEmail ? (
                        <FormHelperText color={"#DC0101"}>Campo obrigatório.</FormHelperText>
                    ) : (<></>)}

                    <FormLabel>Senha</FormLabel>
                    <Input type="password" placeholder="Senha" value={password} onChange={onChangePassword} borderColor={'#30302f'}/>
                    {isErrorPassword ? (
                        <FormHelperText color={"#DC0101"}>Campo obrigatório.</FormHelperText>
                    ) : <></>}     
                </FormControl>

                <Flex flexDirection="row" gap='6' alignItems="center">
                    <Button mt={4} _hover={{ bg: "#0CA3F5" }} bg={"#0C59F5"} color={"white"} type="submit" isDisabled={isErrorEmail | isErrorPassword} onClick={validateUser}>Entrar</Button>
                    
                </Flex>
            </Flex>
            <Modal size={"md"} isOpen={isModalOpen} onClose={closeModal}>
                <ModalOverlay/>
                <ModalContent padding="10" alignItems="center" justifyContent="center">
                    <ModalHeader>
                        <Text as="b">
                            Erro ao Realizar Login!
                        </Text>
                    </ModalHeader>
                    <ModalCloseButton color={"#30302f"} />
                    <ModalBody>
                        <Text fontWeight={'normal'} textAlign={"center"}>
                            Verifique se as informações inseridas estão corretas e tente novamente!
                        </Text>
                    </ModalBody>
    
                    <ModalFooter>
                        <Button mt={4} _hover={{ bg: "#0CA3F5" }} bg={"#0C59F5"} color={"white"} type="submit" onClick={closeModal}>
                            Voltar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </AbsoluteCenter>
    </Box>
    );
}

export default Login;