import React, {Component} from "react";
import PacienteDataService from "../services/paciente.service";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
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
IconButton
} 
from '@chakra-ui/react'

import { AttachmentIcon } from '@chakra-ui/icons'

export default class ListPaciente extends Component{
    constructor(props){
        super(props);
        this.retrievePaciente = this.retrievePaciente.bind(this)
        
        this.state = {
            pacientes: []
        }
    }

    componentDidMount(){
        this.retrievePaciente()
    }

    retrievePaciente() {
        PacienteDataService.getAll()
        .then(response => {
        this.setState({
            pacientes: response.data
        });
        console.log(response.data);
        })
        .catch(e => {
        console.log(e);
        });
    }

    render() {
        const {pacientes} = this.state
        return(
            
            <Box >
                    <Header title="Lista de Pacientes"/>
                    <Grid minHeight="100vh" width={"80%"} templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap="2" margin="auto">
                    {pacientes && pacientes.map((pacientes)=>(
                        <Box boxShadow="md" borderRadius="md" margin={2}>

                            <Card bg="tomato">
                                <CardHeader>
                                    <Heading size='md'>{pacientes.nome}</Heading>
                                </CardHeader>

                                <CardBody>
                                    <HStack spacing='4'>
                                        <Box>
                                            <Text pt='2' fontSize='sm'>
                                            Telefones:{pacientes.telefone_um} - {pacientes.telefone_dois}
                                            </Text>
                                        </Box>
                                        <IconButton
                                        aria-label="Buscar"
                                        icon={<AttachmentIcon />}
                                        colorScheme="teal"
                                        />
                                        </HStack>
                                </CardBody>
                            </Card>
                        </Box>
                    ))}
                    </Grid>
                    <Footer/>
                </Box>
        )
    }
}