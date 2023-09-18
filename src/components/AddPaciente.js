import React, {useState} from 'react'
import InputMask from 'react-input-mask';
import moment from 'moment';
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
    // ModalBody,
    // FormErrorMessage,
    // FormHelperText,
    // InputLeftAddon,
    // InputLeftElement,

  } from '@chakra-ui/react'
// import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'

import PacienteDataService from "../services/paciente.service"
import PessoaDataService from "../services/pessoa.service"

function AddPaciente() {
    
    const [id, setId] = useState('')
    const [nome, setNome] = useState('')
    const [nrContato, setNrContato] = useState('')
    const [nrContatoSec, setNrContatoSec] = useState('')
    const [dsObservacao, setDsObservacao] = useState('')
    const [idOperador, setIdOperador] = useState('')
    const [dtInativacao, setDtInativacao] = useState('')

    function handleNomeChange(e){
        setNome(e.target.value)
    }

    function handleNrContatoChange(e){
        setNrContato(e.target.value)
    }

    function handleNrContatoSecChange(e){
        setNrContatoSec(e.target.value)
    }

    

    function handleDsObservacaoChange(e){
        setDsObservacao(e.target.value)
    }

    function handleIdOperadorChange(e){
        setIdOperador(e.target.value)
    }

    
    function handleSavePessoa(){
        var data = {
            id: id,
            nome: nome,
            nrContato: nrContato,
            nrContatoSec: nrContatoSec,
            dsObservacao: dsObservacao,
            idOperador: 1//idOperador
        }
        console.log(data)
        PessoaDataService.create(data)
        .then(response => {
            setId(id)
            setNome(nome)
            setNrContato(nrContato)
            setNrContatoSec(nrContatoSec)
            setDsObservacao(dsObservacao)
            setIdOperador(idOperador)
            
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
        handleSavePaciente(id, idOperador)
    }//end savePessoa
    
    function handleSavePaciente(id,idOperador){
        var data = {
            id: id,
            //dtInativacao: moment(new Date('01/01/2001'), 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss'),
            idOperador: idOperador,
        }
        console.log(data)
        PacienteDataService.create(data)
        .then(response => {
            setId(id)
            setDtInativacao(dtInativacao)
            setIdOperador(idOperador)
            
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });

    }

    function handleNewPessoa(){
        setId('')
        setNome('')
        setNrContato('')
        setNrContatoSec('')
        setDsObservacao('')
        setIdOperador('')
        handleNewPaciente()
    }
    function handleNewPaciente(){
        setId('')
        setDtInativacao('')
        setIdOperador('')
    }
    
    
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    // const [input, setInput] = useState('')

    // const handleInputChange = (e) => setInput(e.target.value)
  
    // const isError = input === ''
  

    return (
      <>    
        <MenuItem onClick={onOpen}>Paciente</MenuItem>
        <Modal blockScrollOnMount={false} closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSavePessoa}>
            <ModalContent padding="10">
                <ModalHeader><Center>Cadastro de Paciente</Center></ModalHeader>
                <ModalCloseButton />
                <FormControl >

                    <FormLabel>Nome</FormLabel>
                    <Input type='text' placeholder='Nome completo' onChange={handleNomeChange}/>
                    <FormLabel>Número de telefone</FormLabel>
                    <InputGroup>
                        <InputMask mask="(99) 99999-9999" maskChar={null} onChange={handleNrContatoChange} value={nrContato}>
                        {() => <Input placeholder="1° Número" type='text'  />}
                        </InputMask>    
                    </InputGroup>

                    <FormLabel>Número de telefone</FormLabel>
                    <InputGroup>
                    
                        <InputMask mask="(99) 99999-9999" maskChar={null} onChange={handleNrContatoSecChange} value={nrContatoSec}>
                        {() => <Input placeholder="2° Número" type='text'  />}
                        </InputMask> 
                    </InputGroup>

                    <FormLabel>Observacões</FormLabel>
                    <Textarea resize="none" type='text' placeholder='Observacões' onChange={handleDsObservacaoChange} value={dsObservacao}></Textarea>
                            
                    
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

