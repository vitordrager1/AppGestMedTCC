import React, { useState } from "react";

import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalCloseButton,
	Button,
	useDisclosure,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	Center,
	MenuItem,
	Textarea,
	Spacer,
	FormErrorMessage,
	FormHelperText,
	Box,
	ModalBody,
} from "@chakra-ui/react";
// import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'

import PacienteDataService from "../services/paciente.service";
import PessoaDataService from "../services/pessoa.service";
import AtendenteDataService from "../services/atendente.service";

function AddAtendente() {
	const [idPessoa, setIdPessoa] = useState(0);
	const [nome, setNome] = useState("");
	const [nrCpf, setNrCpf] = useState("");
	const [cdHash, setCdHash] = useState("");
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [submitted, setSubmitted] = useState(false);
	const isErrorNome = nome === "";
	const isErrorCpf = nrCpf === "";
	const isErrorHash = cdHash === "";
	const isError = nome === "" || nrCpf === "" || cdHash === "";
	function handleNomeChange(e) {
		setNome(e.target.value);
	}

	function handleNrCpfChange(e) {
		setNrCpf(e.target.value);
	}

	function handleCdHashChange(e) {
		setCdHash(e.target.value);
	}

	async function handleSavePessoa(event) {
		event.preventDefault();
		var data = {
			nome: nome,
			nrContato: "",
			nrContatoSec: "",
			dsObservacao: "",
			idOperador: 1, //idOperador
		};

		try {
			// Usando await para esperar a resolução da Promise
			const response = await PessoaDataService.create(data).then(
				(response) => {
					// setSubmitted(true);

					handleSaveAtendente(event, response.data.IdPessoa);
				}
			);

			// Aqui você pode fazer qualquer lógica de manipulação de dados necessária
		} catch (error) {
			// Tratando erros, se necessário
			console.log(error);
		}
	}

	async function handleSaveAtendente(event, id) {
		event.preventDefault();
		var data = {
			id_pessoa: id,
			nr_cpf: nrCpf,
			cd_hash: cdHash,
		};

		try {
			// Utilizando await para aguardar a resolução da Promise
			const response = await AtendenteDataService.create(data).then(
				(response) => {
					setSubmitted(true);

					// handleSavePaciente(event, response.data.IdPessoa);
				}
			);

			console.log(response);
		} catch (error) {
			// Tratando erros, se necessário
			console.log(error);
		}
	}

	function clear() {
		setNome("");
		setCdHash("");
		setNrCpf("");
		setSubmitted(false);
	}

	function onOpenClear() {
		onOpen();
		clear();
	}

	return (
		<>
			<Box>
				<Button
					onClick={onOpenClear}
					_hover={[{ bg: "#F57977" }, { color: "white" }]}
					bg={"#F54756"}
					m={7}
					p={5}
				>
					Cadastrar Atendente
				</Button>
				{submitted ? (
					<Modal
						blockScrollOnMount={false}
						isOpen={isOpen}
						onClose={onClose}
						size={"md"}
					>
						<ModalOverlay />

						<ModalContent padding="10">
							<ModalHeader>
								<Center as="b" color={"green"}>
									Cadastro realizado com sucesso !
								</Center>
							</ModalHeader>
							<ModalCloseButton color={"#F54756"} />
							<ModalBody>
								<Center as={"b"}>
									Realizar novo cadastro ?
								</Center>
							</ModalBody>

							<ModalFooter>
								<Button
									mt={4}
									_hover={{ bg: "#F54756" }}
									bg={"#F57977"}
									color={"white"}
									type="submit"
									onClick={clear}
								>
									Sim
								</Button>
								<Spacer />
								<Button
									mt={4}
									_hover={{ bg: "#F54756" }}
									bg={"#F57977"}
									color={"white"}
									onClick={onClose}
								>
									Cancelar
								</Button>
							</ModalFooter>
						</ModalContent>
					</Modal>
				) : (
					<Box>
						<Modal
							blockScrollOnMount={false}
							isOpen={isOpen}
							onClose={onClose}
						>
							<ModalOverlay />
							<form onSubmit={handleSavePessoa}>
								<ModalContent padding="10">
									<ModalHeader>
										<Center>Cadastro de Atendente</Center>
									</ModalHeader>
									<ModalCloseButton color={"#F54756"} />
									<FormControl>
										<FormLabel>Nome</FormLabel>
										<Input
											textTransform={"uppercase"}
											type="text"
											placeholder="Nome completo"
											onChange={handleNomeChange}
										/>
										{isError ? (
											<FormHelperText color={"#DC0101"}>
												Campo obrigatório.
											</FormHelperText>
										) : (
											<FormErrorMessage>
												Campo obrigatório.
											</FormErrorMessage>
										)}

										<FormLabel>Número CPF</FormLabel>
										<Input
											textTransform={"uppercase"}
											type="text"
											placeholder="CPF"
											onChange={handleNrCpfChange}
										/>
										<FormLabel>Senha</FormLabel>
										<Input
											textTransform={"uppercase"}
											type="text"
											placeholder="Senha"
											onChange={handleCdHashChange}
										/>
									</FormControl>

									<ModalFooter>
										<Button
											mt={4}
											_hover={{ bg: "#F54756" }}
											bg={"#F57977"}
											color={"white"}
											type="submit"
											isDisabled={isError}
										>
											Cadastrar
										</Button>
										<Spacer />
										<Button
											mt={4}
											_hover={{ bg: "#F54756" }}
											bg={"#F57977"}
											color={"white"}
											onClick={onClose}
										>
											Cancelar
										</Button>
									</ModalFooter>
								</ModalContent>
							</form>
						</Modal>
					</Box>
				)}
			</Box>
		</>
	);
}
export default AddAtendente;
