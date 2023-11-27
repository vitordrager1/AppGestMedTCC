import React from "react";
import { Button, Box } from "@chakra-ui/react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import AddTipoAtend from "./AddTipoAtendimento";
import AddTipoInterv from "./AddTipoIntervencao";
import AddTipoAtendente from "./AddTipoAtendente";
import AddAtendente from "./AddAtendente";
function PainelAdministrador() {
	return (
		<Box>
			<Header />
			<Box h={"100vh"} mt={20}>
				<Box borderRadius={5} w={"80%"} m={"auto"} bg={"#F9A19B"}>
					<AddTipoAtend />
					<AddTipoInterv />
					<AddTipoAtendente />
					<AddAtendente />
				</Box>
			</Box>
			<Footer />
		</Box>
	);
}

export default PainelAdministrador;
