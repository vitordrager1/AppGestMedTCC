import React, { useState } from "react";
import InputMask from "react-input-mask";
import moment from "moment";

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
} from "@chakra-ui/react";
// import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'

import PacienteDataService from "../services/paciente.service";
import PessoaDataService from "../services/pessoa.service";

function AddPaciente() {
	const [idPessoa, setIdPessoa] = useState("");
	const [nome, setNome] = useState("");
	const [nrContato, setNrContato] = useState("");
	const [nrContatoSec, setNrContatoSec] = useState("");
	const [dsObservacao, setDsObservacao] = useState("");
	const [idOperador, setIdOperador] = useState("");
	const [dtInativacao, setDtInativacao] = useState("");
	const { isOpen, onOpen, onClose } = useDisclosure();
	const isError = nome === "";
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
			const response = await PessoaDataService.create(data);

			// Aqui você pode fazer qualquer lógica de manipulação de dados necessária
			setIdPessoa(response.data.IdPessoa);
			handleSavePaciente(response.data.IdPessoa);
		} catch (error) {
			// Tratando erros, se necessário
			console.log(error);
		}
	}

	async function handleSavePaciente(id) {
		var data = {
			IdPessoa: id,
			// dtInativacao: moment(new Date('01/01/2001'), 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss'),
			id_operador: 1,
		};
		console.log(data);

		try {
			// Utilizando await para aguardar a resolução da Promise
			const response = await PacienteDataService.create(data);
			console.log("ok");
		} catch (error) {
			// Tratando erros, se necessário
			console.log(error);
		}
	}

	return (
		<>
			<MenuItem onClick={onOpen}>Paciente</MenuItem>
			<Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<form onSubmit={handleSavePessoa}>
					<ModalContent padding="10">
						<ModalHeader>
							<Center>Cadastro de Paciente</Center>
						</ModalHeader>
						<ModalCloseButton color={"#F54756"} />
						<FormControl>
							<FormLabel>Nome</FormLabel>
							<Input
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
							<FormLabel>Número de telefone</FormLabel>
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

							<FormLabel>Número de telefone</FormLabel>
							<InputGroup>
								<InputMask
									mask="(99) 99999-9999"
									maskChar={null}
									onChange={handleNrContatoSecChange}
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

							<FormLabel>Observacões</FormLabel>
							<Textarea
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
		</>
	);
}
export default AddPaciente;
