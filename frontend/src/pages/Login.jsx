import Form from "../components/form/Form.jsx";
import InputField from "../components/form/InputField.jsx";
import {useState} from "react";
import api from "../api/axios.js";
import ErrorComponent from "../components/ErrorComponent.jsx";
import {useNavigate} from "react-router-dom";
import LoadingComponent from "../components/LoadingComponent.jsx";
import useAuth from "../hooks/useAuth.js";

export default function Login() {
    const [user, setUserData] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {setUser} = useAuth();

    async function handleSubmit(event) {
        event.preventDefault();
        setError({});

        try {
            setLoading(true);
            await api.get("/sanctum/csrf-cookie");
            const {data} = await api.post("/api/login", user);
            setUser(data.name);
            localStorage.setItem("user", JSON.stringify(data.name));
            navigate("/");
        } catch (error) {
            setError(error.response.data);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <LoadingComponent />;
    }

    return (
        <Form onSubmit={handleSubmit} header='Sign in!' buttonText="Sign in">
            <InputField id="email" label="Email:" placeholder="example@email.com" type="email"
                        onChange={(event) => setUserData(prev =>
                            ({
                                ...prev,
                                [event.target.name]: event.target.value
                            }))}/>

            <InputField id="password" label="Password:" type="password"
                        onChange={(event) => setUserData(prev =>
                            ({
                                ...prev,
                                [event.target.name]: event.target.value
                            }))}/>

            {error && <ErrorComponent message={error.message}/>}
        </Form>
    )
}