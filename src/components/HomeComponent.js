import { Box,Flex,  Text, Card ,CardBody, Heading } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Calendar from "./CalenderComponent";
import AddAtendimento from "./AddAtendimento"
import EditAgendamento from "./EditAgendamento";

import agendamentoService from "../services/agendamento.service";
import { format } from "date-fns-tz";
function Home() {
	const [agendamentos, setAgendamentos] = useState([]);
	const [dataAgendamento, setDataAgendamento] = useState(new Date());

	const retrieveAgendamento = useCallback(async (date) => {
		if (!date) {
			date = new Date();
		}
		var dataClicada = new Date(date);
		var dataClicadaFormat = format(dataClicada, "yyyy-MM-dd");
		agendamentoService
			.getAllDate(dataClicadaFormat)
			.then((response) => {
				console.log(response.data);
				setAgendamentos(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	});

	const AgendamentoInfo = ({label, value}) => (
		<Flex direction="row" gap={1}>
			<Text fontWeight="bold" textTransform={"capitalize"}>{label}:</Text>
			<Text>{value}</Text>
		</Flex>
	)

	const AgendamentoList = ({agendamento}) => {
		return(
			<>
				<Card mb='2'>
					<CardBody>
						<Heading size='md'  textTransform={"capitalize"} mb='2vh' bg='#f7f6f0'>{agendamento.nr_agendamento} - {(agendamento.paciente.pessoa.nome).toLowerCase()}</Heading>
						<Flex flexDirection={'column'}>
							<AgendamentoInfo value={String(agendamento.dt_horaInicio).slice(0, 5) + ' - ' + String(agendamento.dt_horaFim).slice(0, 5) } label={'Horário Agendado'}/>
						</Flex>
						<Flex flexDirection={'row'} gap='1'>
							<AddAtendimento  idPessoa={agendamento.IdPessoa} cdTipoAtend={agendamento.cd_tipoAtend} nrAgendamento={agendamento.nr_agendamento}/>
							<EditAgendamento id={agendamento.nr_agendamento}/>
						</Flex>
					</CardBody>
				</Card>
			</>
		)
	}

	useEffect(() => {
		retrieveAgendamento();
	}, [dataAgendamento]);
	return (
		<Box>
			<Header />
			<Flex flexDirection={'row'} gap='5' justifyContent={'center'} alignContent={'center'} m='4vh'>
					<Box boxShadow={5} borderRadius={5} p={5} bg={"#02E09D"} w='50vh'>
						<Calendar onDateChange={retrieveAgendamento} />	
					</Box>
					<Flex
						bg='#02E09D'
						flexDirection='column'
						position="sticky"
						top="0"
						bgColor="primary.100"
						zIndex="sticky"
						height="50vh"
						width="50%"
						alignItems="center"
						flexWrap="nowrap"
						overflowX="auto"
						css={{
							WebkitOverflowScrolling: "touch",
							msOverflowStyle: "-ms-autohiding-scrollbar",
						}}
						borderRadius={5}
						sx={{
							'&::-webkit-scrollbar': {
							  width: '16px',
							  borderRadius: '8px',
							  backgroundColor: `rgba(0, 0, 0, 0.05)`,
							},
							'&::-webkit-scrollbar-thumb': {
							  borderRadius: '8px',
							  backgroundColor: `rgba(0, 0, 0, 0.2)`,
							},
						}}	
					>
						<Box w='90%'>
							<Text textAlign={'center'} fontWeight={'semibold'} boxShadow={5} borderRadius={5} p={2} bg={"#f7f6f0"} mb='2vh' mt='2vh'>
								Agendamentos Programados
							</Text>
							{
								agendamentos.map(agendamento =>  {
									return (
										<AgendamentoList agendamento={agendamento}/>
									)
								})
							}
						</Box>
					</Flex>
			</Flex>
			<Footer />
		</Box>
	);
}

export default Home;