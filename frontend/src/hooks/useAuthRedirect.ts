import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import useAuth from "./useAuth";

export default function useAuthRedirect() {
    const navigate = useNavigate();
    const {user, loading} = useAuth();

    useEffect(() => {
        if (!loading && !user) {
            navigate("/login");
        }
    }, [navigate, user, loading]);
}