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
	Box,
	Text,
	ModalBody,
	FormHelperText,
	FormErrorMessage,
} from "@chakra-ui/react";

import TipoAtendService from "../services/tipoAtend.service";
function AddTipoAtend() {
	const [cdTipoAtend, setCdTipoAtend] = useState("");
	const [dsTipoAtend, setDsTipoAtend] = useState("");
	const [idOperador, setIdOperador] = useState("");
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [submitted, setSubmitted] = useState(false);
	const isError = dsTipoAtend === "";
	function handleDsTipoAtendChange(e) {
		setDsTipoAtend(e.target.value);
	}

	function handleSaveTipoAtend(event) {
		event.preventDefault();
		var data = {
			cd_tipoatend: "",
			ds_tipoatend: dsTipoAtend,
			id_operador: 1, //idOperador
		};
		TipoAtendService.create(data)
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
		setDsTipoAtend("");
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
					Cadastrar Tipo de Atendimento
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
					<Box>
						<Modal
							blockScrollOnMount={false}
							isOpen={isOpen}
							onClose={onClose}
						>
							<ModalOverlay />
							<form onSubmit={handleSaveTipoAtend}>
								<ModalContent padding="10">
									<ModalHeader>
										<Center>
											Cadastro de Tipo de Atendimento
										</Center>
									</ModalHeader>
									<ModalCloseButton color={"#30302f"} />
									<FormControl>
										<FormLabel>Descrição</FormLabel>
										<Input
											textTransform={"uppercase"}
											type="text"
											placeholder="Descrição do tipo de atendimento"
											onChange={handleDsTipoAtendChange}
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
					</Box>
				)}
			</Box>
		</>
	);
}
export default AddTipoAtend;
