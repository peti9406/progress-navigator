import Form from "../components/form/Form";
import InputField from "../components/form/InputField";
import React, {useState} from "react";
import api from "../api/axios";
import ErrorComponent from "../components/ErrorComponent";
import {useNavigate} from "react-router-dom";
import handleError from "../utils/HandleError";
import {LoginResponseSchema} from "../types/responses/LoginResponse";
import useAuth from "../hooks/useAuth";

export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const {setUser} = useAuth();

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setError([]);
        setLoading(true);

        try {
            await api.get("/sanctum/csrf-cookie");
            const {data} = await api.post("/api/login", {email, password});
            const parsed = LoginResponseSchema.safeParse(data);

            if (parsed.success) {
                setUser(parsed.data.user);
                navigate("/");
                return;
            }
        } catch (error) {
            handleError(error, setError);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Form onSubmit={handleSubmit} header='Sign in!' buttonText="Sign in" loading={loading}>
            <InputField id='email' label="Email:" placeholder="example@email.com" type="email" value={email}
                        onChange={(event) => setEmail(event.target.value)}/>

            <InputField id='password' label="Password:" type="password" value={password}
                        onChange={(event) => setPassword(event.target.value)}/>

            {error.length > 0 && <ErrorComponent messages={error}/>}
        </Form>
    )
}