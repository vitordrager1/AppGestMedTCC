// import React, { Component } from "react";
// import "./App.css";
// import { Routes, Route, Link } from "react-router-dom";

// import { ChakraProvider } from "@chakra-ui/react";
// import Home from "./components/HomeComponent";
// import ListPaciente from "./components/ListPaciente";
// import ListAgendamento from "./components/ListAgendamento";
// import ListAtendimento from "./components/ListAtendimento";
// import AboutUs from "./components/AboutUs";
// import PainelAdministrador from "./components/PainelAdministrador";
// import Login from "./components/Login";
// import { AuthProvider } from "./context/auth";
// const App = () => {
// 	return (
// 		<ChakraProvider>
// 			<div>
// 				<AuthProvider>
// 					<Routes>
// 						<Route path="/" element={<Login />} />
// 						<Route path="/home" element={<Home />} />
// 						<Route path="/pessoas" element={<ListPaciente />} />
// 						<Route
// 							path="/agendamentos"
// 							element={<ListAgendamento />}
// 						/>
// 						<Route
// 							path="/atendimento"
// 							element={<ListAtendimento />}
// 						/>
// 						<Route path="/sobre" element={<AboutUs />} />
// 						<Route
// 							path="/painel"
// 							element={<PainelAdministrador />}
// 						/>
// 					</Routes>
// 				</AuthProvider>
// 			</div>
// 		</ChakraProvider>
// 	);
// };

// export default App;
import { AppRouter } from "./routes";
import { AuthProvider } from "./context/auth";
import { ChakraProvider } from "@chakra-ui/react";

export const App = () => {
	return (
		<ChakraProvider>
			<AuthProvider>
				<AppRouter />
			</AuthProvider>
		</ChakraProvider>
	);
};
