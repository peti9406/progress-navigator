import {useState} from "react";
import InputField from "../components/form/InputField.jsx";
import api from "../api/axios.js";
import Form from "../components/form/Form.jsx";
import LoadingComponent from "../components/LoadingComponent.jsx";

export default function Register() {
    const [user, setUser] = useState({});
    const [error, setError] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setError({});

        try {
            setLoading(true);
            await api.get("/sanctum/csrf-cookie");
            await api.post("/api/register", user);
            setSubmitted(true);
        } catch (error) {
            setError(error.response.data.errors);
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

    return (<>
            {submitted ?
                (<div className="mx-4">
                    <h1 className='text-xl font-bold my-2'>Your account has been created!</h1>
                    <p> To complete your registration, please check your email inbox and click the activation link we’ve
                        sent you.<br/>
                        If you don’t see the email, be sure to check your spam or junk folder as well.</p>
                </div>)
                : <Form onSubmit={handleSubmit} header="Register Now!" buttonText={"Register"}>
                    <InputField id="name" label="Name:" placeholder="Name" type="text" error={error}
                                onChange={(event) => setUser(prev =>
                                    ({
                                        ...prev,
                                        [event.target.name]: event.target.value
                                    }))}/>

                    <InputField id="email" label="Email:" placeholder="example@email.com" type="email" error={error}
                                onChange={(event) => setUser(prev =>
                                    ({
                                        ...prev,
                                        [event.target.name]: event.target.value
                                    }))}/>

                    <InputField id="email_confirmation" label="Confirm Email:" placeholder="example@email.com"
                                type="email"
                                error={error}
                                onChange={(event) => setUser(prev =>
                                    ({
                                        ...prev,
                                        [event.target.name]: event.target.value
                                    }))}/>

                    <InputField id="password" label="Password:" type="password" error={error}
                                onChange={(event) => setUser(prev =>
                                    ({
                                        ...prev,
                                        [event.target.name]: event.target.value
                                    }))}/>
                </Form>
            }
        </>
    )
}