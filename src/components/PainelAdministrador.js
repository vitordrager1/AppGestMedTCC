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
			<Box align='center' pt='19vh' justify='center' width='auto'>
				<Box borderRadius={5} bg={"#e6e4dc"}  p={'2px'} justify='center' align='center' width='40vh' flexDirection="column">
					<AddTipoAtend />
					<AddTipoInterv />
					<AddTipoAtendente />
					<AddAtendente />
				</Box>
			</Box>
			<Footer/>
		</Box>
	);
}

export default PainelAdministrador;
