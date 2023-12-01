import React, { Component } from "react";
import agendamentoService from "../services/agendamento.service";
import atendimentoService from "../services/atendimento.service"
import Header from "./HeaderComponent";
import { format } from "date-fns-tz";
import Footer from "./FooterComponent";
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

export default class ListAtendimento extends Component {
	constructor(props) {
		super(props);
		this.retrieveAtendimento = this.retrieveAtendimento.bind(this);

		this.state = {
			atendimentos: [],
			tipoAtend: [],
		};
	}

	async componentDidMount() {
		await this.retrieveAtendimento();
	}

	async retrieveAtendimento() {
		try {
			const response = await atendimentoService.getAll();
			this.setState({
				atendimentos: response.data,
			});
			// Carregar dados do tipo de atendimento para cada agendamento
			const tipoAtendPromises = response.data.map(async (atendimento) => {
				const tipoAtendimento = await this.retListTipoAtend(
					atendimento.cd_tipoAtend
				);
				return { ...atendimento, tipoAtendimento };
			});

			const atendimentosWithType = await Promise.all(tipoAtendPromises);
			this.setState({ atendimentos: atendimentosWithType });
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
		const { atendimentos } = this.state;
		return (
			<Box>
				<Header/>
				<Box minH={"100vh"} mt={10}>
					<Grid
						width={"80%"}
						templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
						gap="2"
						margin="auto"
					>
						{atendimentos &&
							atendimentos.map((atendimento) => {
								var dataFormatada = new Date(atendimento.dt_atendimento)

								//const tipoAtendimento = await this.retListTipoAtend(agendamento.cd_tipoAtend)
								return (
									<Box
										bg={"#02D09D"}
										key={atendimento.nr_atendimento}
										boxShadow="md"
										borderRadius="md"
										margin={2}
									>
										<Card bg="tomato">
											<CardHeader
												bg={"#02D09D"}
												color={"#30302f"}
											>
												<HStack
													justify={"space-between"}
												>
													<Heading size="md">
														{atendimento.nr_atendimento} - {" "}
														{
															atendimento.paciente
																.pessoa.nome
														}
													</Heading>
												</HStack>
											</CardHeader>

											<CardBody
												bg={"#93D6C6"}
												color={"#30302f"}
												// fontFamily={"Arial"}
												fontWeight='semibold'
											>
												<HStack spacing="4">
													<Box>
														<Text>
															Tipo de Atendimento:{" "}
															{atendimento.tipoAtendimento
																? atendimento
																		.tipoAtendimento
																		.ds_tipoAtend
																: "Carregando..."}
														</Text>
														<Text>
															Data Agendamento:{" "}
															{format(dataFormatada, "dd-MM-yyyy")}
														</Text>
														<Text>
															Descrição motivo atendimento:{" "}
															{atendimento.ds_motivo
																? atendimento.ds_motivo
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
