import React, { Component } from "react";
import agendamentoService from "../services/agendamento.service";
import atendimentoService from "../services/atendimento.service"
import Header from "./HeaderComponent";
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
				<Header title="Atendimentos" />
				<Box minH={"100vh"} mt={10}>
					<Grid
						width={"80%"}
						templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
						gap="2"
						margin="auto"
					>
						{atendimentos &&
							atendimentos.map((atendimento) => {
								//const tipoAtendimento = await this.retListTipoAtend(agendamento.cd_tipoAtend)
								return (
									<Box
										bg={"#F57977"}
										key={atendimento.nr_atendimento}
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
															atendimento.paciente
																.pessoa.nome
														}
													</Heading>
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
															{atendimento.tipoAtendimento
																? atendimento
																		.tipoAtendimento
																		.ds_tipoAtend
																: "Carregando..."}
														</Text>
														<Text>
															Data Agendamento:{" "}
															{
																atendimento.dt_atendimento
															}
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
