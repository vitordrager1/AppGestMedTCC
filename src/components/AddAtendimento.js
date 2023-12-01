import React, { useEffect, useState } from "react";
import {
	Modal,
	Select,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	useDisclosure,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Input,
	InputGroup,
	InputLeftAddon,
	InputLeftElement,
	Center,
	Link,
	MenuItem,
	Spacer,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	Box,
	Stack,
	Text,
} from "@chakra-ui/react";
import atendimentoService from "../services/atendimento.service";
import tipoAtendService from "../services/tipoAtend.service";
import tipoIntervService from "../services/tipoInterv.service";
import pessoaService from "../services/pessoa.service";
import agendamentoService from "../services/agendamento.service";
import "../components/SearchByName/Search.css";
function AddAtendimento({ idPessoa, cdTipoAtend, nrAgendamento }) {
	const [nrAtendimento, setNrAtendimento] = useState("");
	const [dataAtendimento, setDataAtendimento] = useState("");
	const [horaInicio, setHoraInicio] = useState("");
	const [horaFim, setHoraFim] = useState("");
	const [dsMotivo, setDsMotivo] = useState("");
	const [idOperador, setIdOperador] = useState("");
	// const [nrAgendamento, setNrAgendamento] = useState("");
	const [cdTipoInterv, setCdTipoInterv] = useState("");
	const [dsTipoInterv, setDsTipoInterv] = useState([]);
	//const [idPessoa, setIdPessoa] = useState("");
	const [nome, setNome] = useState("");
	//const [cdAtend, setCdAtend] = useState(1);
	const [dsTipoAtend, setDsTipoAtend] = useState("");
	const { isOpen, onOpen, onClose } = useDisclosure();
	const isErrorTipoInterv = cdTipoInterv === "" || cdTipoInterv === 0;
	const isErrorDtAtendimento = dataAtendimento === "";
	const [submitted, setSubmitted] = useState(false);
	const isError =
		cdTipoInterv === "" || cdTipoInterv === 0 || dataAtendimento === "";

	function handleDsMotivoChange(e) {
		setDsMotivo(e.target.value);
	}

	function handleDataAtendimeto(e) {
		setDataAtendimento(e.target.value);
	}

	function handleHoraInicio(e) {
		setHoraInicio(e.target.value);
	}

	function handleHoraFim(e) {
		setHoraFim(e.target.value);
	}

	function handleCdTipoIntervChange(e) {
		setCdTipoInterv(e.target.value);
	}

	function handleSaveAtendimento(event) {
		event.preventDefault();
		const dataFormat = `${dataAtendimento},00:00:00`;
		var data = {
			dt_atendimento: dataFormat,
			dt_horaInicio: horaInicio,
			dt_horaFim: horaFim,
			ds_motivo: dsMotivo,
			id_operador: 1,
			nr_agendamento: nrAgendamento,
			cd_tipoInterv: cdTipoInterv,
			id_pessoa: idPessoa,
			cd_tipoAtend: cdTipoAtend,
		};
		console.log(cdTipoInterv);
		atendimentoService
			.create(data)
			.then((response) => {
				setSubmitted(true)
				handleUpdateAgendamento(nrAgendamento)
			})
			.catch((error) => {
				
				console.log(error.response.status);
			});
	}

	function retListTipoAtend() {
		tipoAtendService
			.get(cdTipoAtend)
			.then((response) => {
				console.log(response);
				setDsTipoAtend(response.data.ds_tipoAtend);
			})
			.catch((e) => {
				console.log(e);
			});
	}

	function retListTipoInterv() {
		tipoIntervService
			.getAll()
			.then((response) => {
				setDsTipoInterv(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	}

	function retNomePaciente() {
		//
		pessoaService
			.get(idPessoa)
			.then((response) => {
				setNome(response.data.nome);
			})
			.catch((e) => {
				console.log(e);
			});
	}

	function clear() {
		setNrAtendimento("");
		setDataAtendimento("");
		setHoraInicio("");
		setHoraFim("");
		setDsMotivo("");
		setIdOperador("");
		setSubmitted(false);
	}

	function onOpenClear() {
		onOpen();
		clear();
	}

	function handleUpdateAgendamento(nrAgendamento){
		var data = {
			is_atendido: true
		}
		agendamentoService
			.update(nrAgendamento, data)
			.then((response) => {
				console.log(response)
			})
			.catch((e) => {
				console.log(e);
			});
	}

	useEffect(() => {
		retNomePaciente();
		retListTipoAtend();
	}, []);

	return (
		<>
			<Box>
				<Button onClick={onOpenClear} _hover={{ bg: "#0CA3F5" }} bg={"#0C59F5"}>
					Registrar Atendimento
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
							<ModalCloseButton color={"#30302f"} />

							<ModalFooter>
								<Button
									mt={4}
									_hover={{ bg: "#0CA3F5" }} bg={"#0C59F5"}
									color={"white"}
									type="submit"
									onClick={onClose}
								>
									Ok
								</Button>
								
							</ModalFooter>
						</ModalContent>
					</Modal>
				) : (
					<Modal
						blockScrollOnMount={false}
						isOpen={isOpen}
						onClose={onClose}
					>
						<ModalOverlay />
						<form onSubmit={handleSaveAtendimento}>
							<ModalContent padding="10">
								<ModalHeader align='center'>
									Registrar Atendimento
								</ModalHeader>
								<ModalCloseButton color={"#30302f"} />
								<FormControl>
									<FormLabel>
										Agendamento
									</FormLabel>
									<Input type="text" value={nrAgendamento + " - " + nome} isDisabled={true}/>

									<FormLabel as={"b"}>
										Tipo Atendimento
									</FormLabel>
									<Input
										isReadOnly={true}
										value={dsTipoAtend}
									></Input>
									<FormLabel>Tipo Intervenção</FormLabel>
									<Select
										value={cdTipoInterv}
										onClick={retListTipoInterv}
										onChange={handleCdTipoIntervChange}
									>
										<option key={0} value={0}></option>
										{dsTipoInterv.map((dsTipoInterv) => (
											<option
												key={dsTipoInterv.cd_tipoInterv}
												value={
													dsTipoInterv.cd_tipoInterv
												}
											>
												{dsTipoInterv.ds_tipoInterv}
											</option>
										))}
									</Select>

									{isErrorDtAtendimento ? (
										<FormHelperText color={"#DC0101"}>
											Campo obrigatório.
										</FormHelperText>
									) : (
										<FormErrorMessage>
											Campo obrigatório.
										</FormErrorMessage>
									)}

									<FormLabel>Data Atendimento</FormLabel>
									<Input
										type="date"
										placeholder="Data agendamento"
										onChange={handleDataAtendimeto}
										value={dataAtendimento}
									/>
									{isErrorDtAtendimento ? (
										<FormHelperText color={"#DC0101"}>
											Campo obrigatório.
										</FormHelperText>
									) : (
										<FormErrorMessage>
											Campo obrigatório.
										</FormErrorMessage>
									)}
									<FormLabel>Horário de início</FormLabel>
									<Input
										type="time"
										placeholder="Início"
										onChange={handleHoraInicio}
										value={horaInicio}
									/>

									<FormLabel>Horário de Término</FormLabel>
									<Input
										type="time"
										placeholder="Término"
										onChange={handleHoraFim}
										value={horaFim}
									/>

									<FormLabel>Descrição do Motivo</FormLabel>
									<Input
										type="text"
										placeholder="Observacões"
										onChange={handleDsMotivoChange}
										value={dsMotivo}
									/>
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
				)}
			</Box>
		</>
	);
}
export default AddAtendimento;
