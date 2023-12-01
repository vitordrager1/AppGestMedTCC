import React, { useState } from "react";
import InputMask from "react-input-mask";

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

function AddPaciente() {
	const [idPessoa, setIdPessoa] = useState(0);
	const [nome, setNome] = useState("");
	const [nrContato, setNrContato] = useState("");
	const [nrContatoSec, setNrContatoSec] = useState("");
	const [dsObservacao, setDsObservacao] = useState("");
	const [idOperador, setIdOperador] = useState("");
	const [dtInativacao, setDtInativacao] = useState("");
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [submitted, setSubmitted] = useState(false);
	const isError = nome === "" || nrContato !== "" && nrContato.length < 15 && nrContatoSec !== "" && nrContatoSec.length < 15;
	const isErrorNrContato = nrContato !== "" && nrContato.length < 15 ;
	const isErrorNrContatoSec = nrContatoSec !== "" && nrContatoSec.length < 15 ;;
	function handleNomeChange(e) {
		setNome(e.target.value);
	}

	function handleNrContatoChange(e) {
		setNrContato(e.target.value);
	}

	function handleNrContatoSecChange(e) {
		setNrContatoSec(e.target.value);
	}

	function handleDsObservacaoChange(e) {
		setDsObservacao(e.target.value);
	}

	function handleIdOperadorChange(e) {
		setIdOperador(e.target.value);
	}

	async function handleSavePessoa(event) {
		event.preventDefault();
		var data = {
			nome: nome,
			nrContato: nrContato,
			nrContatoSec: nrContatoSec,
			dsObservacao: dsObservacao,
			idOperador: 1, //idOperador
		};

		try {
			// Usando await para esperar a resolução da Promise
			const response = await PessoaDataService.create(data).then(
				(response) => {
					// setSubmitted(true);

					handleSavePaciente(event, response.data.IdPessoa);
				}
			);

			// Aqui você pode fazer qualquer lógica de manipulação de dados necessária
		} catch (error) {
			// Tratando erros, se necessário
			console.log(error);
		}
	}

	async function handleSavePaciente(event, id) {
		event.preventDefault();
		var data = {
			IdPessoa: id,
			// dtInativacao: moment(new Date('01/01/2001'), 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss'),
			id_operador: 1,
		};

		try {
			// Utilizando await para aguardar a resolução da Promise
			const response = await PacienteDataService.create(data).then(
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
		setIdPessoa("");
		setNome("");
		setNrContato("");
		setNrContatoSec("");
		setDsObservacao("");
		setIdOperador("");
		setDtInativacao("");
		setSubmitted(false);
	}

	function onOpenClear() {
		onOpen();
		clear();
	}

	return (
		<>
			<Box>
				<MenuItem onClick={onOpenClear}>Paciente</MenuItem>
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
							<ModalCloseButton color={"#30302f"} />
							<ModalBody>
								<Center as={"b"}>
									Realizar novo cadastro ?
								</Center>
							</ModalBody>

							<ModalFooter>
								<Button
									mt={4}
									_hover={{ bg: "#0CA3F5" }} bg={"#0C59F5"}
									color={"white"}
									type="submit"
									onClick={clear}
								>
									Sim
								</Button>
								<Spacer />
								<Button
									mt={4}
									_hover={{ bg: "#0CA3F5" }} bg={"#0C59F5"}
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
										<Center>Cadastro de Paciente</Center>
									</ModalHeader>
									<ModalCloseButton color={"#30302f"} />
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
										<FormLabel>
											Número de telefone
										</FormLabel>
										<InputGroup>
											<InputMask
												mask="(99) 99999-9999"
												maskChar={null}
												onChange={handleNrContatoChange}
												value={nrContato}
											>
												{() => (
													<Input
														placeholder="1° Número"
														type="text"
													/>
												)}
											</InputMask>
										</InputGroup>
										{isErrorNrContato ? (
											<FormHelperText color={"#DC0101"}>
												Preencha com onze dígitos.
											</FormHelperText>
										) : (
											<FormErrorMessage>
												Campo obrigatório.
											</FormErrorMessage>
										)}
										<FormLabel>
											Número de telefone
										</FormLabel>
										<InputGroup>
											<InputMask
												mask="(99) 99999-9999"
												maskChar={null}
												onChange={
													handleNrContatoSecChange
												}
												value={nrContatoSec}
											>
												{() => (
													<Input
														placeholder="2° Número"
														type="text"
													/>
												)}
											</InputMask>
										</InputGroup>
										{isErrorNrContatoSec ? (
											<FormHelperText color={"#DC0101"}>
												Preencha com onze dígitos.
											</FormHelperText>
										) : (
											<FormErrorMessage>
												Campo obrigatório.
											</FormErrorMessage>
										)}
										<FormLabel>Observacões</FormLabel>
										<Textarea
											textTransform={"uppercase"}
											resize="none"
											type="text"
											placeholder="Observacões"
											onChange={handleDsObservacaoChange}
											value={dsObservacao}
										></Textarea>
									</FormControl>

									<ModalFooter>
										<Button
											mt={4}
											_hover={{ bg: "#0CA3F5" }} bg={"#0C59F5"}
											color={"white"}
											type="submit"
											isDisabled={isError}
										>
											Cadastrar
										</Button>
										<Spacer />
										<Button
											mt={4}
											_hover={{ bg: "#0CA3F5" }} bg={"#0C59F5"}
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
export default AddPaciente;
