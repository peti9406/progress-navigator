import Form from "../components/form/Form.jsx";
import InputField from "../components/form/InputField.jsx";
import {useState} from "react";
import api from "../api/axios.js";
import ErrorComponent from "../components/ErrorComponent.jsx";
import {useNavigate} from "react-router-dom";
import LoadingComponent from "../components/LoadingComponent.jsx";

export default function Login({setName}) {
    const [user, setUser] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        setError({});

        try {
            setLoading(true);
            await api.get("/sanctum/csrf-cookie");
            const {data} = await api.post("/api/login", user);
            localStorage.setItem('name', data.name);
            setName(data.name);
            navigate("/");
        } catch (error) {
            setError(error.response.data);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (<div className="flex items-center justify-center my-2">
                <LoadingComponent/>
            </div>
        );
    }

    return (
        <Form onSubmit={handleSubmit} header='Sign in!' buttonText="Sign in">
            <InputField id="email" label="Email:" placeholder="example@email.com" type="email"
                        onChange={(event) => setUser(prev =>
                            ({
                                ...prev,
                                [event.target.name]: event.target.value
                            }))}/>

            <InputField id="password" label="Password:" type="password"
                        onChange={(event) => setUser(prev =>
                            ({
                                ...prev,
                                [event.target.name]: event.target.value
                            }))}/>

            {error && <ErrorComponent message={error.message}/>}
        </Form>
    )
}