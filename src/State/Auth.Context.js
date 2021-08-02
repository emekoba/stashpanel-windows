import React, { useContext, useState } from "react";
import { auth } from "../Services/firebase.service";

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentuser, setsurrentuser] = useState();

	function signup() {
		return auth.createUserWithEmailAndPassword(email, password);
	}

	auth.onAuthStateChanged((user) => {
		setsurrentuser(user);
	});

	const value = {
		currentuser,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
