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
        <Header />
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
                  bg={"#02D09D"}
                  key={pacientes.IdPessoa}
                  boxShadow="md"
                  margin={2}
                >
                  <Card >
                    <CardHeader bg={"#02D09D"} color={"#30302f"}>
                      <HStack justify={"space-between"}>
                        <Heading size="md" >{pacientes.nome}</Heading>
                        <EditPaciente id={pacientes.IdPessoa}/>
                      </HStack>
                    </CardHeader>

                    <CardBody
                      bg={"#93D6C6"}
                      color={"#30302f"}
                      // fontFamily={"Arial"}
                    >
                      <HStack spacing="4">
                        <Box>
                          <Text fontSize="sm" fontWeight='semibold'>
                            Telefones: {pacientes.nr_contato} - {" "} {pacientes.nr_contatosec}
                          </Text>
                          <Text fontSize="sm" fontWeight='semibold' >Observações: {pacientes.ds_observacao}</Text>
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
