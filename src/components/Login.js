import {
	Box,
	Spacer,
	Flex,
	AbsoluteCenter,
	Image,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import InputMask from "react-input-mask";
import { Navigate } from "react-router";
import { AuthContext } from "../context/auth";
import React, { useState, useCallback, useContext } from "react";

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

import atendenteService from "../services/atendente.service";
function Login() {
	const [cpf, setCpf] = useState("");
	const [password, setPassword] = useState("");
	const [cpfResponse, setCpfResponse] = useState("");
	const [passwordResponse, setPasswordResponse] = useState("");
	const isErrorCpf = cpf === "";
	const isErrorPassword = password === "";
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { SignIn, signed } = useContext(AuthContext);

	const handleSignIn = async (e) => {
		e.preventDefault();
		const data = {
			cpf,
			password,
		};
		await SignIn(data);
		navigate("/home")

	};
	const onChangeCpf = (val) => {
		setCpf(val.target.value.replace(/-/g, ""));
	};

	const onChangePassword = (val) => {
		setPassword(val.target.value);
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const validateUser = () => {
		if (cpf == cpfResponse && password == passwordResponse) {
			//gravar asyncstorage e validar rotas
			setCpf("");
			setPassword("");
			navigate("/home");
		} else {
			openModal();
		}
	};

	async function retrieveAtendente(cpf) {
		cpf = cpf.replace(/-/g, "");
		await atendenteService
			.getLogin(cpf)
			.then((response) => {
				console.log(response);
				if (response.status == 200 && response.data.length > 0) {
					// console.log(response.data[0].nr_cpf)
					// setCpfResponse(response.data[0].nr_cpf);
					// setPasswordResponse(response.data[0].cd_hash);
					if (
						cpf == response.data[0].nr_cpf &&
						password == response.data[0].cd_hash
					) {
						//gravar asyncstorage e validar rotas
						setCpf("");
						setPassword("");
						navigate("/home");
					}
				} else {
					openModal();
				}
			})
			.catch((e) => {
				console.log(e);
			});
	}

		return (
			<Box bg="#f7f6f0" p="4" minH="100vh">
				<AbsoluteCenter>
					<Flex
						bg="#e6e4dc"
						h={"60vh"}
						w={"350px"}
						borderRadius="10"
						alignItems="center"
						justifyContent="center"
						flexDirection="column"
					>
						<Image
							src="http://127.0.0.1:8082/LogoFarmaciaEscrita.png"
							alt="Logo da Farmácia Integrado"
							pb="5"
						/>

						<form onSubmit={handleSignIn}>
							<FormControl pl="5" pr="5" pb="5">
								<FormLabel>CPF</FormLabel>
								<InputGroup>
									<InputMask
										mask="999-999-999-99"
										maskChar={null}
										onChange={onChangeCpf}
										value={cpf}
									>
										{() => (
											<Input
												borderColor={"#30302f"}
												placeholder="CPF"
												type="text"
											/>
										)}
									</InputMask>
								</InputGroup>
								{isErrorCpf ? (
									<FormHelperText color={"#DC0101"}>
										Campo obrigatório.
									</FormHelperText>
								) : (
									<></>
								)}

								<FormLabel>Senha</FormLabel>
								<Input
									type="password"
									placeholder="Senha"
									value={password}
									onChange={onChangePassword}
									borderColor={"#30302f"}
								/>
								{isErrorPassword ? (
									<FormHelperText color={"#DC0101"}>
										Campo obrigatório.
									</FormHelperText>
								) : (
									<></>
								)}
							</FormControl>

							<Flex
								flexDirection="row"
								gap="6"
								alignItems="center"
							>
								<Button
									mt={4}
									_hover={{ bg: "#0CA3F5" }}
									bg={"#0C59F5"}
									color={"white"}
									type="submit"
									isDisabled={isErrorCpf | isErrorPassword}
								>
									Entrar
								</Button>
							</Flex>
						</form>
					</Flex>
					<Modal
						size={"md"}
						isOpen={isModalOpen}
						onClose={closeModal}
					>
						<ModalOverlay />
						<ModalContent
							padding="10"
							alignItems="center"
							justifyContent="center"
						>
							<ModalHeader>
								<Text as="b">Erro ao Realizar Login!</Text>
							</ModalHeader>
							<ModalCloseButton color={"#30302f"} />
							<ModalBody>
								<Text
									fontWeight={"normal"}
									textAlign={"center"}
								>
									Verifique se as informações inseridas estão
									corretas e tente novamente!
								</Text>
							</ModalBody>

							<ModalFooter>
								<Button
									mt={4}
									_hover={{ bg: "#0CA3F5" }}
									bg={"#0C59F5"}
									color={"white"}
									type="submit"
									onClick={closeModal}
								>
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
