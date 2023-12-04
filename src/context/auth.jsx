import { createContext, useEffect, useState } from "react";
import atendenteService from "../services/atendente.service";
import api from "../http-common";
import { Navigate } from "react-router-dom";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const loadingStoreData = async () => {
			const storageUser = localStorage.getItem("@Auth:user");
			const storageToken = localStorage.getItem("@Auth:token");

			if (storageUser && storageToken) {
				setUser(storageUser);
				console.log("useEffect " + user);
			}
			setLoading(false);
		};
		loadingStoreData();
	}, [user]);

	const SignIn = async (data) => {
		const response = await atendenteService
			.getLogin(data)
			.then((response) => {
				if (response.data.error) {
					alert(response.data.error);
				} else {
					setUser(response.data.user);
					console.log("sign" + user);
					api.defaults.headers.common[
						"Authorization"
					] = `Bearer ${response.data.token}`;
					localStorage.setItem("@Auth:token", response.data.token);
					localStorage.setItem("@Auth:user", response.data.user);
				}
			});
	};

	const singOut = () => {
		localStorage.clear();
		setUser(null);
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				signed: !!user,
				SignIn,
				singOut,
			}}
		>
			{loading ? (
				// Você pode mostrar um indicador de carregamento enquanto o user está sendo carregado
				<p>Carregando...</p>
			) : (
				children
			)}
		</AuthContext.Provider>
	);
};
