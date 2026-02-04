import AuthContext from "./AuthContext.js";
import {useState} from "react";
import api from "../api/axios.js";

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem("user");
        return stored ? JSON.parse(stored) : null;
    });

    async function handleLogout(event) {
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