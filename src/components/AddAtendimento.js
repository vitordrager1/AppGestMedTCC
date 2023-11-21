import React, { useState } from "react";
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
	Text,
} from "@chakra-ui/react";
import { SearchBar } from "./SearchByName/SearchBar";
import { SearchResultsList } from "./SearchByName/SearchResultsList";
import atendimentoService from "../services/atendimento.service";
import tipoAtendService from "../services/tipoAtend.service";
import tipoIntervService from "../services/tipoInterv.service"
import "../components/SearchByName/Search.css";
import { formatInTimeZone, format } from "date-fns-tz";
function AddAtendimento(idPessoa, cdTipoAtend) {
	const [nrAtendimento, setNrAtendimento] = useState("");
	const [dataAtendimento, setDataAtendimento] = useState("");
	const [horaInicio, setHoraInicio] = useState("");
	const [horaFim, setHoraFim] = useState("");
	const [dsMotivo, setDsMotivo] = useState("");
	const [idOperador, setIdOperador] = useState("");
	const [nrAgendamento, setNrAgendamento] = useState("");
	const [cdTipoInterv, setCdTipoInterv] = useState("");
	const [dsTipoInterv, setDsTipoInterv] = useState([]);
	//const [idPessoa, setIdPessoa] = useState("");
	const [nome, setNome] = useState("");
	//const [cdAtend, setCdAtend] = useState(1);
	const [dsTipoAtend, setDsTipoAtend] = useState("");
	const { isOpen, onOpen, onClose } = useDisclosure();

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
		//idPessoa, cdAtend, horaFim, horaInicio, observacoes
		event.preventDefault();
		const dataFormat = `${dataAtendimento},00:00:00`;
		var data = {
			nr_atendimento: nrAtendimento,
			dt_atendimento: dataFormat,
			dt_horaInicio: horaInicio,
			dt_horaFim: horaFim,
			ds_motivo: dsMotivo,
			id_operador: 1,
			nr_agendamento: nrAgendamento,
			cd_tipointerv: cdTipoInterv,
			id_pessoa: idPessoa.id,
			cd_tipoAtend: cdTipoAtend,
		};
		atendimentoService
			.create(data)
			.then((response) => {
				
			})
			.catch((error) => {
				console.log(error.response.status);
			});
	}

	// function retListTipoAtend() {
	// 	tipoIntervService
	// 		.getAll()
	// 		.then((response) => {
	// 			setTipoAtend(response.data);
	// 		})
	// 		.catch((e) => {
	// 			console.log(e);
	// 		});
	// }
	function retListTipoInterv() {
		tipoAtendService
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
        setNome()
	}

	return (
		<>
			<Button
				onClick={onOpen}
				_hover={[{ bg: "#F57977" }, { color: "white" }]}
				bg={"#F54756"}
				m={7}
				p={5}
			>
				Registrar Atendimento
			</Button>
			<Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<form onSubmit={handleSaveAtendimento}>
					<ModalContent padding="10">
						<ModalHeader>
							<Center>Atendimento</Center>
						</ModalHeader>
						<ModalCloseButton color={"#F54756"} />
						<FormControl>
							<FormLabel>Nome Paciente</FormLabel>
							<Text>Teste</Text>
							<FormLabel>Tipo Atendimento</FormLabel>
							<Text>Teste 2</Text>
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
										value={dsTipoInterv.cd_tipoInterv}
									>
										{dsTipoInterv.ds_tipoInterv}
									</option>
								))}
							</Select>

							<FormLabel>Data Atendimento *</FormLabel>
							<Input
								type="date"
								placeholder="Data agendamento"
								onChange={handleDataAtendimeto}
								value={dataAtendimento}
							/>

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
								_hover={{ bg: "#F54756" }}
								bg={"#F57977"}
								color={"white"}
								type="submit"
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
export default AddAtendimento;
