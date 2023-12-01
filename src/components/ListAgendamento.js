import React, { Component } from "react";
import agendamentoService from "../services/agendamento.service";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { format } from "date-fns-tz";
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
				<Header />
				<Box minH={"100vh"} mt={10}>
					<Grid
						width={"80%"}
						templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
						gap="2"
						margin="auto"
					>
						{agendamentos &&
							agendamentos.map((agendamento) => {
								var dataFormatada = new Date(agendamento.dt_atendimento)
								//const tipoAtendimento = await this.retListTipoAtend(agendamento.cd_tipoAtend)
								return (
									<Box
										bg={"#02D09D"}
										key={agendamento.nr_agendamento}
										boxShadow="md"
										borderRadius="md"
										margin={2}
									>
										<Card>
											<CardHeader bg={"#02D09D"} color={"#30302f"}>
												<Flex justify={"flex-start"} flex-direction='row'>	
													<Heading size="md">
														{
															agendamento.nr_agendamento
														}		
														{" - "}
														{
															agendamento.paciente
																.pessoa.nome
														}
														<Flex flex-direction='column' gap='3' justify='flex-start' mt='4'>
															<AddAtendimento  idPessoa={agendamento.IdPessoa} cdTipoAtend={agendamento.cd_tipoAtend} nrAgendamento={agendamento.nr_agendamento}/>
															<EditAgendamento id={agendamento.nr_agendamento}/>
														</Flex>
													</Heading>
												</Flex>
											</CardHeader>

											<CardBody
												bg={"#93D6C6"}
												color={"#30302f"}
												// fontFamily={"Arial"}
											>
												<HStack spacing="4">
													<Box fontWeight='semibold'>
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
															{format(dataFormatada, "dd-MM-yyyy")}
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
