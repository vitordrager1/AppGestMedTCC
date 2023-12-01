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

function AddAgendamento(props) {
	const [results, setResults] = useState([[]]);
	const [tipoAtend, setTipoAtend] = useState([]);
	const [idPessoa, setIdPessoa] = useState("");
	const [nome, setNome] = useState("");
	const [cdAtend, setCdAtend] = useState("");
	const [horaInicio, setHoraInicio] = useState("");
	const [horaFim, setHoraFim] = useState("");
	const [observacoes, setObservacoes] = useState("");
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [dataAgendamento, setDataAgendamento] = useState("");
	const [showResults, setShowResults] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const isErrorNome = nome === "";
	const isErrorTipoAtend = cdAtend === "" || cdAtend === 0;
	const isErrorDtAgendamento = dataAgendamento === "";
	const isError =
		nome === "" ||
		cdAtend === "" ||
		cdAtend === 0 ||
		dataAgendamento === "";

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
			is_atendido: false,
		};
		agendamentoService
			.create(data)
			.then((response) => {
				setSubmitted(true);
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

	function clear() {
		setResults([""]);
		setTipoAtend([""]);
		setIdPessoa("");
		setNome("");
		setCdAtend("");
		setHoraInicio("");
		setHoraFim("");
		setObservacoes("");
		setDataAgendamento("");
		setSubmitted(false);
	}

	function onOpenClear() {
		onOpen();
		clear();
	}

	return (
		<>
			<Box>
				<MenuItem onClick={onOpenClear}>Agendamento</MenuItem>
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
									Realizar novo agendamento ?
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
					<Modal
						blockScrollOnMount={false}
						isOpen={isOpen}
						onClose={onClose}
					>
						<ModalOverlay />
						<form onSubmit={handleSaveAgendamento}>
							<ModalContent padding="10">
								<ModalHeader>
									<Center>Agendamento</Center>
								</ModalHeader>
								<ModalCloseButton color={"#30302f"} />
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
													onNameClick={
														handleNomeIdChange
													}
													className="Search"
												/>
											)}
										{console.log(results)}
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
									<FormLabel>Data Agendamento </FormLabel>
									<Input
										textTransform={"uppercase"}
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
									<FormLabel>
										Horário previsão de início
									</FormLabel>
									<Input
										type="time"
										placeholder="Início"
										onChange={handleHoraInicio}
										value={horaInicio}
									/>

									<FormLabel>
										Horário previsão de Término
									</FormLabel>
									<Input
										type="time"
										placeholder="Término"
										onChange={handleHoraFim}
										value={horaFim}
									/>

									<FormLabel>Observações</FormLabel>
									<Input
										textTransform={"uppercase"}
										type="text"
										placeholder="Observacões"
										onChange={handleObservacoesChange}
										value={observacoes}
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
export default AddAgendamento;
