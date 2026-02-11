import React, {createContext} from "react";
import {User} from "../types/User";

interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    handleLogout: (event: React.MouseEvent<HTMLButtonElement>) => void;
    loading: boolean;
    token: string | null;
    setToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;