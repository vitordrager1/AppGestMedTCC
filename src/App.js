import React, {Component} from 'react'
import './App.css';
import { Routes, Route, Link } from "react-router-dom";


// import AddTutorial from "./components/add-tutorial.component";
import AddTutorial from "./components/AddTutorial";
import Tutorial from "./components/tutorial.component";
import TutorialsList from "./components/tutorials-list.component";

import Home from "./components/HomeComponent"
import Header from "./components/HeaderComponent"
import Navbar from "./components/MenuComponent"
import { ChakraProvider } from '@chakra-ui/react';
import ListPaciente from './components/ListPaciente';
const App = () => {

  return(

      <ChakraProvider>
        

        <div>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/pacientes' element={<ListPaciente/>} />
            {/* <Route path='/tutorials' element={<TutorialsList/>} />
            <Route path='/add' element={<AddTutorial/>} />
            <Route path='/tutorials/:id' element={<Tutorial/>} /> */}
          </Routes>
        </div>

        
    </ChakraProvider>
  )
  


}


export default App;
