import { Box, Spacer, Flex } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Calendar from "./CalenderComponent";
import ListAgendamentoDate from "./ListAgendamentoDate";

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
		console.log(dataClicadaFormat);
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

	useEffect(() => {
		retrieveAgendamento();
	}, [dataAgendamento]);
	return (
		<Box>
			<Header />
			{/* <Box > h={"100vh"} mt={10} */}
			<Box>
				<Flex m="10">
					<Spacer />
					<Box boxShadow={5} borderRadius={5} p={2} bg={"#02E09D"}>
						<Calendar onDateChange={retrieveAgendamento} />
					</Box>
					<Spacer></Spacer>
					<ListAgendamentoDate
						dados={agendamentos}
						itemsPerPage={5}
					/>
					<Spacer />
				</Flex>
			</Box>
			<Footer />
		</Box>
	);
}

export default Home;
