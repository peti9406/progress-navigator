import {useContext} from "react";
import AuthContext from "../contexts/AuthContext";

export default function useAuth() {
    const auth = useContext(AuthContext);

    if (!auth) {
        throw new Error('AuthContext should be used inside a AuthProvider');
    }
    return auth;
}