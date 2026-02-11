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
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

    useEffect(() => {
        async function rememberUser() {
                try {
                    if (token) {
                        const {data} = await api.get("/api/user", {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            }
                        });
                        const parsed = LoginResponseSchema.safeParse(data);

                        if (parsed.success) {
                            setUser(parsed.data.user);
                            setToken(parsed.data.token);
                        }
                    }
                } catch (error) {
                    setUser(null);
                    setToken(null);
                } finally {
                    setLoading(false);
                }
        }

        rememberUser();
    }, []);

    async function handleLogout(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        await api.post("/api/logout", {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
    }

    return (
        <AuthContext.Provider value={{user, setUser, handleLogout, loading, token, setToken}}>
            {children}
        </AuthContext.Provider>
    )
}