import React, { useState } from "react";

import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
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
	Box,
	FormHelperText,
	FormErrorMessage,
} from "@chakra-ui/react";

import TipoIntervService from "../services/tipoInterv.service";
function AddTipoInterv() {
	const [cdTipoAtend, setCdTipoAtend] = useState("");
	const [dsTipoInterv, setDsTipoInterv] = useState("");
	const [idOperador, setIdOperador] = useState("");
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [submitted, setSubmitted] = useState(false);
	const isError = dsTipoInterv === "";
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
				setSubmitted(true);
				// alert("Cadastro realizado com sucesso.");
				// window.location.reload();
			})
			.catch((e) => {
				console.log(e);
			});
	}

	function clear() {
		setCdTipoAtend("");
		setDsTipoInterv("");
		setIdOperador("");
		setSubmitted(false);
	}

	function onOpenClear() {
		onOpen();
		clear();
	}

	return (
		<>
			<Box>
				<Button
					onClick={onOpenClear}
					_hover={[{ color: "white" }]}
					bg={"#02E09D"}
					m={3}
					p={5}
					w='90%'
				>
					Cadastrar Tipo de Intervenção
				</Button>
				{submitted ? (
					<Modal
						blockScrollOnMount={false}
						isOpen={isOpen}
						onClose={onClose}
						size={"md"}
					>
						<ModalOverlay />

						<ModalContent padding="10">
							<ModalHeader>
								<Center as="b" color={"green"}>
									Cadastro realizado com sucesso !
								</Center>
							</ModalHeader>
							<ModalCloseButton color={"#30302f"} />
							<ModalBody>
								<Center as={"b"}>
									Realizar novo cadastro ?
								</Center>
							</ModalBody>

							<ModalFooter>
								<Button
									mt={4}
									_hover={{ bg: "#0CA3F5" }} bg={"#0C59F5"}
									color={"white"}
									type="submit"
									onClick={clear}
								>
									Sim
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
					</Modal>
				) : (
					<Modal
						blockScrollOnMount={false}
						isOpen={isOpen}
						onClose={onClose}
					>
						<ModalOverlay />
						<form onSubmit={handleSaveTipoInterv}>
							<ModalContent padding="10">
								<ModalHeader>
									<Center>
										Cadastro de Tipo de Intervenção
									</Center>
								</ModalHeader>
								<ModalCloseButton color={"#30302f"} />
								<FormControl>
									<FormLabel>Descrição</FormLabel>
									<Input
										textTransform={"uppercase"}
										type="text"
										placeholder="Descrição do tipo de atendimento"
										onChange={handleDsTipoIntervChange}
									/>
									{isError ? (
										<FormHelperText color={"#DC0101"}>
											Campo obrigatório.
										</FormHelperText>
									) : (
										<FormErrorMessage>
											Campo obrigatório.
										</FormErrorMessage>
									)}
								</FormControl>

								<ModalFooter>
									<Button
										mt={4}
										_hover={{ bg: "#0CA3F5" }} bg={"#0C59F5"}
										color={"white"}
										type="submit"
										isDisabled={isError}
									>
										Cadastrar
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
				)}
			</Box>
		</>
	);
}
export default AddTipoInterv;
