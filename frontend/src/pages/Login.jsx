import Form from "../components/form/Form.jsx";
import InputField from "../components/form/InputField.jsx";
import {useState} from "react";
import api from "../api/axios.js";
import ErrorComponent from "../components/ErrorComponent.jsx";
import {useNavigate} from "react-router-dom";
import LoadingComponent from "../components/LoadingComponent.jsx";
import useAuth from "../hooks/useAuth.js";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {setUser} = useAuth();

    async function handleSubmit(event) {
        event.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await api.get("/sanctum/csrf-cookie");
            const {data} = await api.post("/api/login", {email, password});
            setUser(data.name);
            navigate("/");
        } catch (error) {
            setError(error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <LoadingComponent/>;
    }

    return (
        <Form onSubmit={handleSubmit} header='Sign in!' buttonText="Sign in">
            <InputField label="Email:" placeholder="example@email.com" type="email" value={email}
                        onChange={(event) => setEmail(event.target.value)}/>

            <InputField label="Password:" type="password" value={password}
                        onChange={(event) => setPassword(event.target.value)}/>

            {error && <ErrorComponent message={error.message}/>}
        </Form>
    )
}