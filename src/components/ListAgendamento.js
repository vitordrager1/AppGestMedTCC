import React, { Component } from "react";
import agendamentoService from "../services/agendamento.service";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import AddAtendimento from "./AddAtendimento"
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Stack,
	Box,
	Heading,
	StackDivider,
	Text,
	Textarea,
	Flex,
	Grid,
	GridItem,
	HStack,
	IconButton,
	space,
	Button,
} from "@chakra-ui/react";
import tipoAtendService from "../services/tipoAtend.service";
import { EditIcon } from "@chakra-ui/icons";
import EditAgendamento from "./EditAgendamento";
export default class ListAgendamento extends Component {
	constructor(props) {
		super(props);
		this.retrieveAgendamento = this.retrieveAgendamento.bind(this);

		this.state = {
			agendamentos: [],
			tipoAtend: [],
		};
	}

	async componentDidMount() {
		await this.retrieveAgendamento();
	}

	async retrieveAgendamento() {
		try {
			const response = await agendamentoService.getAll();
			this.setState({
				agendamentos: response.data,
			});
			console.log(response.data);

			// Carregar dados do tipo de atendimento para cada agendamento
			const tipoAtendPromises = response.data.map(async (agendamento) => {
				const tipoAtendimento = await this.retListTipoAtend(
					agendamento.cd_tipoAtend
				);
				return { ...agendamento, tipoAtendimento };
			});

			const agendamentosWithType = await Promise.all(tipoAtendPromises);
			this.setState({ agendamentos: agendamentosWithType });
		} catch (e) {
			console.log(e);
		}
	}

	async retListTipoAtend(cdTipoAtend) {
		try {
			const response = await tipoAtendService.get(cdTipoAtend);
			return response.data;
		} catch (e) {
			console.log(e);
			return null;
		}
	}

	render() {
		const { agendamentos } = this.state;
		return (
			<Box>
				<Header title="Agendamentos" />
				<Box minH={"100vh"} mt={10}>
					<Grid
						width={"80%"}
						templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
						gap="2"
						margin="auto"
					>
						{agendamentos &&
							agendamentos.map((agendamento) => {
								//const tipoAtendimento = await this.retListTipoAtend(agendamento.cd_tipoAtend)
								return (
									<Box
										bg={"#F57977"}
										key={agendamento.nr_agendamento}
										boxShadow="md"
										borderRadius="md"
										margin={2}
									>
										<Card bg="tomato">
											<CardHeader
												bg={"#F54756"}
												color={"white"}
											>
												<HStack
													justify={"space-between"}
												>
													<Heading size="md">
														Paciente:{" "}
														{
															agendamento.paciente
																.pessoa.nome
														}
													</Heading>
													<Box>
														<AddAtendimento />
														<EditAgendamento
															id={
																agendamento.nr_agendamento
															}
														/>
													</Box>
												</HStack>
											</CardHeader>

											<CardBody
												bg={"#F57977"}
												color={"white"}
												fontFamily={"Arial"}
											>
												<HStack spacing="4">
													<Box>
														<Text>
															Tipo de Atendimento:{" "}
															{agendamento.tipoAtendimento
																? agendamento
																		.tipoAtendimento
																		.ds_tipoAtend
																: "Carregando..."}
														</Text>
														<Text>
															Data Agendamento:{" "}
															{
																agendamento.dt_atendimento
															}
														</Text>
														<Text>
															Observações:{" "}
															{agendamento.ds_observacao
																? agendamento.ds_observacao
																: "Sem observações"}
														</Text>
													</Box>
												</HStack>
											</CardBody>
										</Card>
									</Box>
								);
							})}
					</Grid>
				</Box>
				<Footer />
			</Box>
		);
	}
}
