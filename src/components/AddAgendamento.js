import React, {useState} from 'react'

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
    FormErrorMessage,
    FormHelperText,
    Input,
    InputGroup,
    InputLeftAddon,
    InputLeftElement,
    Center,
    Link,
    MenuItem
    
  } from '@chakra-ui/react'
import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'

import PacienteDataService from "../services/paciente.service"
function AddAgendamento(props) {
    
    const [id, setId] = useState('')
    const [nome, setNome] = useState('')
    const [telefone1, setTelefone1] = useState('')
    const [telefone2, setTelefone2] = useState('')
    const [dt_cancel, setDt_cancel] = useState('')
    const [observacoes, setObservacoes] = useState('')

    function handleNomeChange(e){
        setNome(e.target.value)
    }

    function handleTelefone1Change(e){
        setTelefone1(e.target.value)
    }

    function handleTelefone2Change(e){
        setTelefone2(e.target.value)
    }

    

    function handleDt_cancelChange(e){
        setDt_cancel(e.target.value)
    }

    function handleObservacoesChange(e){
        setObservacoes(e.target.value)
    }

    function handleSavePaciente(){
        var data = {
            id: id,
            nome: nome,
            telefone1: telefone1,
            telefone2: telefone2,
            dt_cancel: dt_cancel,
            observacoes: observacoes
        }
        console.log(data)
        PacienteDataService.create(data)
        .then(response => {
            setId(id)
            setNome(nome)
            setTelefone1(telefone1)
            setTelefone2(telefone2)
            setDt_cancel(dt_cancel)
            setObservacoes(observacoes)

            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    function handleNewPaciente(){
        setId('')
        setNome('')
        setTelefone1('')
        setTelefone2('')
        setDt_cancel('')
        setObservacoes('')
    }
    
    
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    const [input, setInput] = useState('')

    const handleInputChange = (e) => setInput(e.target.value)
  
    const isError = input === ''
  

    return (
      <>   
        <MenuItem onClick={onOpen}>Agendamento</MenuItem>
        <Modal blockScrollOnMount={false} closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSavePaciente}>
            <ModalContent>
                <ModalHeader><Center>Cadastro de Paciente</Center></ModalHeader>
                <ModalCloseButton />
                <FormControl >

                    <FormLabel>First name</FormLabel>
                    <Input type='text' placeholder='First name' onChange={handleNomeChange}/>
                    <FormLabel>Número de telefone 1</FormLabel>
                    <InputGroup>
                        
                        <InputLeftElement pointerEvents='none'>
                            <PhoneIcon color='gray.300' />
                        </InputLeftElement>
                        <Input type='number' placeholder='Telefone 1' onChange={handleTelefone1Change} value={telefone1}/>
                    </InputGroup>

                    <FormLabel>Número de telefone 2</FormLabel>
                    <InputGroup>
                        
                        <InputLeftElement pointerEvents='none'>
                            <PhoneIcon color='gray.300' />
                        </InputLeftElement>
                        <Input type='number' placeholder='Telefone 2' onChange={handleTelefone2Change} value={telefone2}/>
                    </InputGroup>

                    <FormLabel>Observacões</FormLabel>
                    <Input type='text' placeholder='Observacões' onChange={handleObservacoesChange} value={observacoes}/>
                            
                    
                </FormControl>

                <ModalFooter>
                    <Button mt={4} colorScheme='teal' type='submit'>
                        Submit
                    </Button>
                    <Button mt={4} colorScheme='teal' onClick={onClose}>
                        Cancelar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </form>
            
        
        </Modal>
      </>
    )
  }
export default AddAgendamento

