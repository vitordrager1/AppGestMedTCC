import React, { useState } from "react";

import {
	Modal,
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
} from "@chakra-ui/react";

import TipoIntervService from "../services/tipoInterv.service";
function AddTipoInterv() {
	const [cdTipoAtend, setCdTipoAtend] = useState("");
	const [dsTipoInterv, setDsTipoInterv] = useState("");
	const [idOperador, setIdOperador] = useState("");
	const { isOpen, onOpen, onClose } = useDisclosure();
	function handleDsTipoIntervChange(e) {
		setDsTipoInterv(e.target.value);
	}

	function handleSaveTipoInterv(event) {
		event.preventDefault();
		var data = {
			cd_tipoInterv: "",
			ds_tipoInterv: dsTipoInterv,
			id_operador: 1, //idOperador
		};
		console.log(data);
		TipoIntervService.create(data)
			.then((response) => {
				setDsTipoInterv(dsTipoInterv);
				alert("Cadastro realizado com sucesso.");
				window.location.reload();
			})
			.catch((e) => {
				console.log(e);
			});
	}

	return (
		<>
			<Button
				onClick={onOpen}
				_hover={[{ bg: "#F57977" }, { color: "white" }]}
				bg={"#F54756"}
				m={7}
				p={5}
			>
				Cadastrar Tipo de Intervenção
			</Button>
			<Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<form onSubmit={handleSaveTipoInterv}>
					<ModalContent padding="10">
						<ModalHeader>
							<Center>Cadastro de Tipo de Intervenção</Center>
						</ModalHeader>
						<ModalCloseButton color={"#F54756"} />
						<FormControl>
							<FormLabel>Descrição</FormLabel>
							<Input
								type="text"
								placeholder="Descrição do tipo de atendimento"
								onChange={handleDsTipoIntervChange}
							/>
						</FormControl>

						<ModalFooter>
							<Button
								mt={4}
								_hover={{ bg: "#F54756" }}
								bg={"#F57977"}
								color={"white"}
								type="submit"
							>
								Cadastrar
							</Button>
							<Spacer />
							<Button
								mt={4}
								_hover={{ bg: "#F54756" }}
								bg={"#F57977"}
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
export default AddTipoInterv;
