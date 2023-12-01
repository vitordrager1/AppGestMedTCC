import React, {Component} from 'react'
import './App.css';
import { Routes, Route, Link } from "react-router-dom";


import Home from "./components/HomeComponent"
import Header from "./components/HeaderComponent"
import Navbar from "./components/MenuComponent"
import { ChakraProvider } from '@chakra-ui/react';
import ListPaciente from './components/ListPaciente';
import ListAgendamento from './components/ListAgendamento'
import ListAtendimento from './components/ListAtendimento';
import AboutUs from './components/AboutUs'
import PainelAdministrador from './components/PainelAdministrador';
import Login from './components/Login'

const App = () => {

  return(

      <ChakraProvider>
        

        <div>
          <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/home' element={<Home/>} />
            <Route path='/pessoas' element={<ListPaciente/>} />
            <Route path='/agendamentos' element={<ListAgendamento/>} />
            <Route path='/atendimento' element={<ListAtendimento/>} />
            <Route path='/sobre' element={<AboutUs/>} />
            <Route path='/painel' element={<PainelAdministrador/>} />
            {/* <Route path='/tutorials' element={<TutorialsList/>} />
            <Route path='/add' element={<AddTutorial/>} />
            <Route path='/tutorials/:id' element={<Tutorial/>} /> */}
          </Routes>
        </div>

        
    </ChakraProvider>
  )
  


}


export default App;
