import { useContext } from "react";
import { AuthContext } from "../context/auth";
import { Outlet, Navigate } from "react-router";

export const PrivateRoute = () => {
	const { signed, loading } = useContext(AuthContext);
	console.log("private " + signed);
	if (loading) {
		// Aguarda até que o carregamento esteja concluído
		return <p>Carregando...</p>;
	}

	return signed ? <Outlet /> : <Navigate to="/" />;
};
