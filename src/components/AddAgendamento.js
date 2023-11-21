import React, { useState } from "react";
import {
  Modal,
  Select,
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
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Center,
  Link,
  MenuItem,
  Spacer,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Text,
} from "@chakra-ui/react";
import { SearchBar } from "./SearchByName/SearchBar";
import { SearchResultsList } from "./SearchByName/SearchResultsList";
import agendamentoService from "../services/agendamento.service";
import tipoAtendService from "../services/tipoAtend.service";
import "../components/SearchByName/Search.css";
import { formatInTimeZone, format } from 'date-fns-tz'
function AddAgendamento(props) {
  const [errorAlert, setErrorAlert] = useState(null);
  const [results, setResults] = useState([]);
  const [tipoAtend, setTipoAtend] = useState([]);
  const [idPessoa, setIdPessoa] = useState("");
  const [nome, setNome] = useState("");
  const [cdAtend, setCdAtend] = useState(1);
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFim, setHoraFim] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [input, setInput] = useState("");
  const [dataAgendamento, setDataAgendamento] = useState("");
  const [showResults, setShowResults] = useState("");
  const requiredFields = [idPessoa, cdAtend, dataAgendamento];

  var isError = false;

  function handleNomeIdChange(id, nome) {
    setNome(nome);
    setIdPessoa(id);
  }

  function handleDataAgendamento(e) {
    setDataAgendamento(e.target.value);
    validateRequiredFields();
  }

  function handleHoraInicio(e) {
    setHoraInicio(e.target.value);
  }

  function handleHoraFim(e) {
    setHoraFim(e.target.value);
  }

  function handleCdTipoAtend(e) {
    setCdAtend(e.target.value);
  }

  function handleObservacoesChange(e) {
    setObservacoes(e.target.value);
  }

  function validateRequiredFields() {
    requiredFields.map((field) => {
      if (field === "") {
        isError = true;
        console.log(isError);
      }
    });
  }

  function handleSaveAgendamento(event) {
    //idPessoa, cdAtend, horaFim, horaInicio, observacoes
    event.preventDefault();
    const dataFormat = `${dataAgendamento},00:00:00`
    var data = {
      IdPessoa: idPessoa,
      cd_tipoAtend: cdAtend,
      dt_atendimento: dataFormat,
      dt_horaInicio: horaInicio,
      dt_horaFim: horaFim,
      ds_observacao: observacoes,
      id_operador: 1,
    };
    agendamentoService
      .create(data)
      .then((response) => {
        setErrorAlert(null);
      })
      .catch((error) => {
        console.log(error.response.status);
        if (error.response && error.response.status === 400) {
          // Exibir o alerta de erro com a mensagem específica
          setErrorAlert("Existem campos obrigatórios não preenchidos.");
          console.log(errorAlert);
        } else {
          // Exibir um alerta genérico
          setErrorAlert("Erro inesperado. Entre em contato com o suporte.");
        }
      });
  }

  function retListTipoAtend() {
    tipoAtendService
      .getAll()
      .then((response) => {
        setTipoAtend(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  // function handleShowResult () {
  //     if(showResults == true)
  // }

  return (
    <>
      <MenuItem onClick={onOpen}>Agendamento</MenuItem>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSaveAgendamento}>
          <ModalContent padding="10">
            {errorAlert && (
              <Alert status="warning">
                <AlertIcon />
                {errorAlert}
              </Alert>
            )}
            <ModalHeader>
              <Center>Agendamento</Center>
            </ModalHeader>
            <ModalCloseButton color={"#F54756"} />
            <FormLabel>Nome Paciente</FormLabel>
            <FormControl>
              <div className="search-bar-container">
                <SearchBar
                  setShowResults={setShowResults}
                  setResults={setResults}
                  setName={nome}
                />
                {console.log(nome)}
                {showResults && results && results.length > 0 && (
                  <SearchResultsList
                    results={results}
                    onNameClick={handleNomeIdChange}
                    className="Search"
                  />
                )}
              </div>
              {!isError && <Text mb={3}>O campo é obrigatório</Text>}

              <FormLabel>Tipo Atendimento</FormLabel>
              <Select
                value={cdAtend}
                onClick={retListTipoAtend}
                onChange={handleCdTipoAtend}
              >
                <option key={0} value={0}></option>
                {tipoAtend.map((tipoAtend) => (
                  <option
                    key={tipoAtend.cd_tipoAtend}
                    value={tipoAtend.cd_tipoAtend}
                  >
                    {tipoAtend.ds_tipoAtend}
                  </option>
                ))}
              </Select>

              <FormLabel>Data Agendamento *</FormLabel>
              <Input
                type="date"
                placeholder="Data agendamento"
                onChange={handleDataAgendamento}
                value={dataAgendamento}
              />

              <FormLabel>Horário previsão de início</FormLabel>
              <Input
                type="time"
                placeholder="Início"
                onChange={handleHoraInicio}
                value={horaInicio}
              />

              <FormLabel>Horário previsão de Término</FormLabel>
              <Input
                type="time"
                placeholder="Término"
                onChange={handleHoraFim}
                value={horaFim}
              />

              <FormLabel>Observações</FormLabel>
              <Input
                type="text"
                placeholder="Observacões"
                onChange={handleObservacoesChange}
                value={observacoes}
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
export default AddAgendamento;
