import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { AttachmentIcon, EditIcon } from "@chakra-ui/icons";
import {
	Checkbox,
	CheckboxGroup,
	Modal,
	Select,
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
	Stack,
	IconButton,
} from "@chakra-ui/react";
import agendamentoService from "../services/agendamento.service";
import tipoAtendService from "../services/tipoAtend.service";
import { format } from "date-fns-tz";

function EditAgendamento(id) {
	const [cdAtend, setCdAtend] = useState(1);
	const [horaInicio, setHoraInicio] = useState("");
	const [horaFim, setHoraFim] = useState("");
	const [observacoes, setObservacoes] = useState("");
	const [dataAgendamento, setDataAgendamento] = useState("");
	const [inCancelado, setInCancelado] = useState(Boolean);
	const [tipoAtend, setTipoAtend] = useState([]);
	const { isOpen, onOpen, onClose } = useDisclosure();

	function handleCdAtendChange(e) {
		setCdAtend(e.target.value);
	}
	function handleHoraInicioChange(e) {
		setHoraInicio(e.target.value);
	}
	function handleHoraFimChange(e) {
		setHoraFim(e.target.value);
	}
	function handleObservacoesChange(e) {
		setObservacoes(e.target.value);
	}
	function handleDataAgendamentoChange(e) {
		setDataAgendamento(e.target.value);
	}
	function handleStAtendimentoChange(e) {
		setInCancelado(e.target.value ? true : false);
		console.log(inCancelado);
	}

	function retrieveAgendamento() {
		agendamentoService
			.get(id.id)
			.then((response) => {
				var data = new Date(response.data.dt_atendimento);
				const dataFormatada = format(data, "yyyy-MM-dd");
				setCdAtend(response.data.cd_tipoAtend);
				setHoraInicio(response.data.dt_horaInicio);
				setHoraFim(response.data.dt_horaFim);
				setObservacoes(response.data.ds_observacao);
				setDataAgendamento(dataFormatada);
				setInCancelado(
					response.data.in_cancelado
				);
			})
			.catch((e) => {
				console.log(e);
			});
	}

	function handleUpdateAgendamento(event) {
		var data = {
			nr_agendamento: id.id,
			cd_tipoAtend: cdAtend,
			dt_horaInicio: horaInicio,
			dt_horaFim: horaFim,
			ds_observacao: observacoes,
			dt_atendimento: dataAgendamento,
			in_cancelado: inCancelado,
		};
		agendamentoService
        .update(id.id, data)
        .then((response) => {

			})
			.catch((e) => {
				console.log(e);
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

	useEffect(() => {
		retListTipoAtend();
		retrieveAgendamento();
	}, []);

	return (
		<>
			<IconButton
				aria-label="Edit"
				icon={<EditIcon />}
				bg={"#0C59F5"}
				color={"#30302f"}
				onClick={onOpen}
			/>
			<Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<form onSubmit={handleUpdateAgendamento}>
					<ModalContent padding="10">
						<ModalHeader>
							<Center>Editar Agendamento</Center>
						</ModalHeader>
						<ModalCloseButton color={"#30302f"} />
						<FormControl>
							<FormLabel>Tipo Atendimento</FormLabel>
							<Select
								value={cdAtend}
								onClick={retListTipoAtend}
								onChange={handleCdAtendChange}
							>
								<option key={0} value={0}></option>
								{tipoAtend.map((tipoAtend) => (
									<option
										key={tipoAtend.cd_tipoAtend}
										value={tipoAtend.cd_tipoAtend}
									>
										{tipoAtend.ds_tipoAtend}
									</option>
								))}
							</Select>

							<FormLabel>Data Agendamento </FormLabel>
							<Input
								type="date"
								placeholder="Data agendamento"
								onChange={handleDataAgendamentoChange}
								value={dataAgendamento}
							/>

							<FormLabel>Horário previsão de início</FormLabel>
							<Input
								type="time"
								placeholder="Início"	
								onChange={handleHoraInicioChange}
								value={horaInicio}
							/>

							<FormLabel>Horário previsão de Término</FormLabel>
							<Input
								type="time"
								placeholder="Término"
								onChange={handleHoraFimChange}
								value={horaFim}
							/>

							<FormLabel>Observações</FormLabel>
							<Input
								type="text"
								placeholder="Observacões"
								onChange={handleObservacoesChange}
								value={observacoes}
							/>

							<Stack mt={8} spacing={5} direction="row">
								<Checkbox
									onChange={handleStAtendimentoChange}
									value={inCancelado}
								>
									Cancelar agendamento ?
								</Checkbox>
							</Stack>
						</FormControl>

						<ModalFooter>
							<Button
								mt={4}
								_hover={{ bg: "#0CA3F5" }} bg={"#0C59F5"}
								color={"white"}
								type="submit"
							>
								Atualizar
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
		</>
	);
}
export default EditAgendamento;
