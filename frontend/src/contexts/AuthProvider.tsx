import AuthContext from "./AuthContext";
import React, {ReactNode, useState} from "react";
import api from "../api/axios.js";
import {User} from "../types/User";

interface AuthProviderProps {
    children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);

    async function handleLogout(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        setUser(null);
        await api.get('sanctum/csrf-cookie');
        await api.post("/api/logout");
    }

    return (
        <AuthContext.Provider value={{user, setUser, handleLogout}}>
            {children}
        </AuthContext.Provider>
    )
}