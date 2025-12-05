import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export default function useAuthRedirect() {
    const navigate = useNavigate();

    useEffect(() => {
        const name = localStorage.getItem("name");
        if (!name) {
            navigate("/login");
        }
    }, [navigate]);
}