import AuthContext from "./AuthContext";
import React, {ReactNode, useEffect, useState} from "react";
import api from "../api/axios.js";
import {User} from "../types/User";
import {LoginResponseSchema} from "../types/responses/LoginResponse";

interface AuthProviderProps {
    children: ReactNode;
}

export default function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function rememberUser() {
            try {
                const {data} = await api.get("/api/user");
                const parsed = LoginResponseSchema.safeParse(data);

                if (parsed.success) {
                    setUser(parsed.data.user);
                }
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        }
        rememberUser();
    }, [])

    async function handleLogout(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        await api.get('sanctum/csrf-cookie');
        await api.post("/api/logout");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user, setUser, handleLogout, loading}}>
            {children}
        </AuthContext.Provider>
    )
}