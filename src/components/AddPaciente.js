import React, {useState} from 'react'
import InputMask from 'react-input-mask';
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
    MenuItem,
    Textarea,
    Spacer

  } from '@chakra-ui/react'
import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'

import PacienteDataService from "../services/paciente.service"
import { Link } from 'react-router-dom'
function AddPaciente() {
    
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
        <MenuItem onClick={onOpen}>Paciente</MenuItem>
        <Modal blockScrollOnMount={false} closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSavePaciente}>
            <ModalContent padding="10">
                <ModalHeader><Center>Cadastro de Paciente</Center></ModalHeader>
                <ModalCloseButton />
                <FormControl >

                    <FormLabel>Nome</FormLabel>
                    <Input type='text' placeholder='Nome completo' onChange={handleNomeChange}/>
                    <FormLabel>Número de telefone</FormLabel>
                    <InputGroup>
                        <InputMask mask="(99) 99999-9999" maskChar={null} onChange={handleTelefone1Change} value={telefone1}>
                        {() => <Input placeholder="1° Número" type='text'  />}
                        </InputMask>    
                    </InputGroup>

                    <FormLabel>Número de telefone</FormLabel>
                    <InputGroup>
                    
                        <InputMask mask="(99) 99999-9999" maskChar={null} onChange={handleTelefone2Change} value={telefone2}>
                        {() => <Input placeholder="2° Número" type='text'  />}
                        </InputMask> 
                    </InputGroup>

                    <FormLabel>Observacões</FormLabel>
                    <Textarea resize="none" type='text' placeholder='Observacões' onChange={handleObservacoesChange} value={observacoes}></Textarea>
                            
                    
                </FormControl>

                <ModalFooter>
                    <Button mt={4} colorScheme='teal' type='submit'>
                        Submit
                    </Button>
                    <Spacer/>
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
export default AddPaciente

