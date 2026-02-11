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
    const [loading, setLoading] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>(null);

    // useEffect(() => {
    //     async function rememberUser() {
    //         try {
    //             const {data} = await api.get("/api/user");
    //             const parsed = LoginResponseSchema.safeParse(data);
    //
    //             if (parsed.success) {
    //                 setUser(parsed.data.user);
    //                 setToken(parsed.data.token);
    //             }
    //         } catch (error) {
    //             setUser(null);
    //             setToken(null);
    //         } finally {
    //             setLoading(false);
    //         }
    //     }
    //     rememberUser();
    // }, [])

    async function handleLogout(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        await api.post("/api/logout",{}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setUser(null);
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{user, setUser, handleLogout, loading, token, setToken}}>
            {children}
        </AuthContext.Provider>
    )
}