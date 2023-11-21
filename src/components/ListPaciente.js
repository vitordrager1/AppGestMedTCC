import React, { Component } from "react";
import PacienteDataService from "../services/paciente.service";
import pessoaService from "../services/pessoa.service";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import EditPaciente from "./EditPaciente"
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
  space,
} from "@chakra-ui/react";



export default class ListPaciente extends Component {
  constructor(props) {
    super(props);
    this.retrievePaciente = this.retrievePaciente.bind(this);

    this.state = {
      pacientes: [],
    };
  }

  componentDidMount() {
    this.retrievePaciente();
  }

  retrievePaciente() {
    pessoaService
      .getAll()
      .then((response) => {
        this.setState({
          pacientes: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { pacientes } = this.state;
    return (
      <Box>
        <Header title="Lista de Pacientes" />
        <Box minH={"100vh"} mt={10}>
          <Grid
            width={"80%"}
            templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
            gap="2"
            margin="auto"
          >
            {pacientes &&
              pacientes.map((pacientes) => (
                <Box
                  bg={"#F57977"}
                  key={pacientes.IdPessoa}
                  boxShadow="md"
                  borderRadius="md"
                  margin={2}
                >
                  <Card bg="tomato">
                    <CardHeader bg={"#F54756"} color={"white"}>
                      <HStack justify={"space-between"}>
                        <Heading size="md">{pacientes.nome}</Heading>
                        <EditPaciente id={pacientes.IdPessoa}/>
                      </HStack>
                    </CardHeader>

                    <CardBody
                      bg={"#F57977"}
                      color={"white"}
                      fontFamily={"Arial"}
                    >
                      <HStack spacing="4">
                        <Box>
                          <Text pt="2" fontSize="sm">
                            Telefones:{pacientes.nr_contato} -{" "}
                            {pacientes.nr_contatosec}
                          </Text>
                          <Text>Observações: {pacientes.ds_observacao}</Text>
                        </Box>
                      </HStack>
                    </CardBody>
                  </Card>
                </Box>
              ))}
          </Grid>
        </Box>
        <Footer />
      </Box>
    );
  }
}
