import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { AttachmentIcon, EditIcon } from "@chakra-ui/icons";
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
	IconButton,
} from "@chakra-ui/react";
import pessoaService from "../services/pessoa.service";
import TipoAtendService from "../services/tipoAtend.service";
import { Alert } from "bootstrap";
function EditPaciente(id) {
	const [nome, setNome] = useState("");
	const [nrContato, setNrContato] = useState("");
	const [nrContatoSec, setNrContatoSec] = useState("");
	const [dsObservacao, setDsObservacao] = useState("");
	const { isOpen, onOpen, onClose } = useDisclosure();

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

	function retrievePaciente() {
		pessoaService
			.get(id.id)
			.then((response) => {
				setNome(response.data.nome);
				setNrContato(response.data.nr_contato);
				setNrContatoSec(response.data.nr_contatosec);
				setDsObservacao(response.data.ds_observacao);
			})
			.catch((e) => {
				console.log(e);
			});
	}

	function handleUpdatePaciente(event) {
		var data = {
			id: id.id,
			nome: nome,
			nr_contato: nrContato,
			nr_contatosec: nrContatoSec,
			ds_observacao: dsObservacao,
		};
		pessoaService
			.update(id.id,data)
			.then((response) => {
				if(response.status == 200){
					alert("Paciente atualizado!");
					window.location.reload();
				}
			})
			.catch((e) => {
				console.log(e);
			});
	}

	useEffect(()=>{
		retrievePaciente()
	},[]);

	return (
		<>
			<IconButton
				aria-label="Edit"
				icon={<EditIcon />}
				bg={"#F57977"}
				color={"white"}
				onClick={onOpen}
			/>
			<Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<form onSubmit={handleUpdatePaciente}>
					<ModalContent padding="10">
						<ModalHeader>
							<Center>Editar Dados Paciente</Center>
						</ModalHeader>
						<ModalCloseButton color={"#F54756"} />
						<FormControl>
							<FormLabel>Nome</FormLabel>
							<Input
								type="text"
								placeholder="Nome completo"
								onChange={handleNomeChange}
								value={nome}
							/>
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
							>
								Atualizar
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
export default EditPaciente;
