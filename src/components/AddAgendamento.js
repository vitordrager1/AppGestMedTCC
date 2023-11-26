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
import agendamentoService from "../services/agendamento.service";
import tipoAtendService from "../services/tipoAtend.service";
import "../components/SearchByName/Search.css";
import { formatInTimeZone, format } from "date-fns-tz";
function AddAgendamento(props) {
	const [results, setResults] = useState([]);
	const [tipoAtend, setTipoAtend] = useState([]);
	const [idPessoa, setIdPessoa] = useState("");
	const [nome, setNome] = useState("");
	const [cdAtend, setCdAtend] = useState("");
	const [horaInicio, setHoraInicio] = useState("");
	const [horaFim, setHoraFim] = useState("");
	const [observacoes, setObservacoes] = useState("");
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [dataAgendamento, setDataAgendamento] = useState("");
	const [showResults, setShowResults] = useState("");

	const isErrorNome = nome === "";
	const isErrorTipoAtend = cdAtend === "" || cdAtend === 0;
	const isErrorDtAgendamento = dataAgendamento === "";
  const isError = nome === "" || cdAtend === "" || cdAtend === 0 || dataAgendamento === "";

	function handleNomeIdChange(id, nome) {
		setNome(nome);
		setIdPessoa(id);
	}

	function handleDataAgendamento(e) {
		setDataAgendamento(e.target.value);
	}

	function handleHoraInicio(e) {
		setHoraInicio(e.target.value);
	}

	function handleHoraFim(e) {
		setHoraFim(e.target.value);
	}

	function handleCdTipoAtend(e) {
		setCdAtend(e.target.value);
	}

	function handleObservacoesChange(e) {
		setObservacoes(e.target.value);
	}

	function handleSaveAgendamento(event) {
		event.preventDefault();
		const dataFormat = `${dataAgendamento},00:00:00`;
		var data = {
			IdPessoa: idPessoa,
			cd_tipoAtend: cdAtend,
			dt_atendimento: dataFormat,
			dt_horaInicio: horaInicio,
			dt_horaFim: horaFim,
			ds_observacao: observacoes,
			id_operador: 1,
		};
		agendamentoService
			.create(data)
			.then((response) => {
        alert('Cadastro realizado com sucesso.')
        window.location.reload();
			})
			.catch((error) => {
				console.log(error.response.status);
			});
	}

	function retListTipoAtend() {
		tipoAtendService
			.getAll()
			.then((response) => {
				setTipoAtend(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	}

  function clear(){
    setResults([""])
    setTipoAtend([""])
    setIdPessoa("")
    setNome("")
    setCdAtend("")
    setHoraInicio("")
    setHoraFim("")
    setObservacoes("")
    setDataAgendamento("")
  }



	return (
		<>
			<MenuItem onClick={onOpen}>Agendamento</MenuItem>
			<Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<form onSubmit={handleSaveAgendamento}>
					<ModalContent padding="10">
						<ModalHeader>
							<Center>Agendamento</Center>
						</ModalHeader>
						<ModalCloseButton color={"#F54756"} />
						<FormLabel>Nome Paciente</FormLabel>
						<FormControl>
							<div className="search-bar-container">
								<SearchBar
									setShowResults={setShowResults}
									setResults={setResults}
									setName={nome}
								/>
								{showResults &&
									results &&
									results.length > 0 && (
										<SearchResultsList
											results={results}
											onNameClick={handleNomeIdChange}
											className="Search"
										/>
									)}
							</div>

							{isErrorNome ? (
								<FormHelperText color={"#DC0101"}>
									Campo obrigatório.
								</FormHelperText>
							) : (
								<FormErrorMessage>
									Campo obrigatório.
								</FormErrorMessage>
							)}

							<FormLabel>Tipo Atendimento</FormLabel>
							<Select
								value={cdAtend}
								onClick={retListTipoAtend}
								onChange={handleCdTipoAtend}
							>
								<option key={0} value={""}></option>
								{tipoAtend.map((tipoAtend) => (
									<option
										key={tipoAtend.cd_tipoAtend}
										value={tipoAtend.cd_tipoAtend}
									>
										{tipoAtend.ds_tipoAtend}
									</option>
								))}
							</Select>
							{isErrorTipoAtend ? (
								<FormHelperText color={"#DC0101"}>
									Campo obrigatório.
								</FormHelperText>
							) : (
								<FormErrorMessage>
									Campo obrigatório.
								</FormErrorMessage>
							)}
							<FormLabel>Data Agendamento *</FormLabel>
							<Input
								type="date"
								placeholder="Data agendamento"
								onChange={handleDataAgendamento}
								value={dataAgendamento}
							/>
							{isErrorDtAgendamento ? (
								<FormHelperText color={"#DC0101"}>
									Campo obrigatório.
								</FormHelperText>
							) : (
								<FormErrorMessage>
									Campo obrigatório.
								</FormErrorMessage>
							)}
							<FormLabel>Horário previsão de início</FormLabel>
							<Input
								type="time"
								placeholder="Início"
								onChange={handleHoraInicio}
								value={horaInicio}
							/>

							<FormLabel>Horário previsão de Término</FormLabel>
							<Input
								type="time"
								placeholder="Término"
								onChange={handleHoraFim}
								value={horaFim}
							/>

							<FormLabel>Observações</FormLabel>
							<Input
								type="text"
								placeholder="Observacões"
								onChange={handleObservacoesChange}
								value={observacoes}
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
		</>
	);
}
export default AddAgendamento;
