import React, {useState} from "react";
import InputField from "../components/form/InputField";
import api from "../api/axios";
import Form from "../components/form/Form";
import ErrorComponent from "../components/ErrorComponent";
import handleError from "../utils/HandleError";

export default function Register() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [email_confirmation, setEmailConfirmation] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [error, setError] = useState<string[]>([]);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setError([]);

        try {
            setLoading(true);
            await api.get("/sanctum/csrf-cookie");
            await api.post("/api/register", {name, email, email_confirmation, password});
            setSubmitted(true);
        } catch (error) {
            handleError(error, setError);
        } finally {
            setLoading(false);
        }
    }

    return (<>
            {submitted
                ? <div
                    className="mt-8 px-2 md:px-8 pt-2 pb-6 bg-[var(--primary-muted)]/20 border-1 border-[var(--primary-muted)]/40 rounded-lg shadow-md max-w-max mx-auto">
                    <h1 className='text-xl font-bold my-2'>Your account has been created!</h1>
                    <p> To complete your registration, please check your email inbox and click the activation link we’ve
                        sent you.<br/>
                        If you don’t see the email, be sure to check your spam or junk folder as well.</p>
                </div>
                : <Form onSubmit={handleSubmit} header="Register Now!" buttonText="Register" loading={loading}>
                    <InputField id='name' label="Name:" placeholder="Name" type="text" value={name}
                                onChange={(event) => setName(event.target.value)}/>

                    <InputField id='email' label="Email:" placeholder="example@email.com" type="email" value={email}
                                onChange={(event) => setEmail(event.target.value)}/>

                    <InputField id='email_confirmation' label="Confirm Email:" placeholder="example@email.com"
                                value={email_confirmation}
                                type="email"
                                onChange={(event) => setEmailConfirmation(event.target.value)}/>

                    <InputField id='password' label="Password:" type="password" value={password}
                                onChange={(event) => setPassword(event.target.value)}/>

                    {error.length > 0 && <ErrorComponent messages={error}/>}
                </Form>
            }
        </>
    )
}