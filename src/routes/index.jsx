// appRouter.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import Home from "../components/HomeComponent";
import ListPaciente from "../components/ListPaciente";
import ListAgendamento from "../components/ListAgendamento";
import ListAtendimento from "../components/ListAtendimento";
import AboutUs from "../components/AboutUs";
import PainelAdministrador from "../components/PainelAdministrador";
import NotFound from "../pages/NotFound";
import { PrivateRoute } from "./privateRoutes";
export const AppRouter = () => {
	return (
		<Router>
			<Routes>
				<Route path="*" element={<NotFound />} />
				<Route path="/" element={<Login />} />

				<Route path="/home" element={<PrivateRoute />}>
					<Route index element={<Home />} />
				</Route>

				<Route path="/painel" element={<PrivateRoute />}>
					<Route index element={<PainelAdministrador />} />
				</Route>

				<Route path="/pessoas" element={<PrivateRoute />}>
					<Route index element={<ListPaciente />} />
				</Route>

				<Route path="/agendamentos" element={<PrivateRoute />}>
					<Route index element={<ListAgendamento />} />
				</Route>

				<Route path="/atendimento" element={<PrivateRoute />}>
					<Route index element={<ListAtendimento />} />
				</Route>

				<Route path="/sobre" element={<PrivateRoute />}>
					<Route index element={<AboutUs />} />
				</Route>
			</Routes>
		</Router>
	);
};
