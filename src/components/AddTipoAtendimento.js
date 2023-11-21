import React, { useState } from "react";
import InputMask from "react-input-mask";

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

import TipoAtendService from "../services/tipoAtend.service";
function AddTipoAtend() {
  const [cdTipoAtend, setCdTipoAtend] = useState("");
  const [dsTipoAtend, setDsTipoAtend] = useState("");
  const [idOperador, setIdOperador] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
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
        setDsTipoAtend(dsTipoAtend);
        alert('Cadastro realizado com sucesso.')
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
        Cadastrar Tipo de Atendimento
      </Button>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSaveTipoAtend}>
          <ModalContent padding="10">
            <ModalHeader>
              <Center>Cadastro de Tipo de Atendimento</Center>
            </ModalHeader>
            <ModalCloseButton color={"#F54756"} />
            <FormControl>
              <FormLabel>Descrição</FormLabel>
              <Input
                type="text"
                placeholder="Descrição do tipo de atendimento"
                onChange={handleDsTipoAtendChange}
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
export default AddTipoAtend;
