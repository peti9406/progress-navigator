import Form from "../components/form/Form.jsx";
import {useState} from "react";
import InputField from "../components/form/InputField.jsx";
import api from "../api/axios.js";
import LoadingComponent from "../components/LoadingComponent.jsx";
import Button from "../components/Button.jsx";
import {useNavigate} from "react-router-dom";
import useAuthRedirect from "../hooks/useAuthRedirect.js";

export default function CreateGoal() {
    const [goal, setGoal] = useState('');
    const [deadline, setDeadline] = useState('');
    const [steps, setSteps] = useState(['']);
    const [error, setError] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useAuthRedirect();

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];

    async function handleSubmit(event) {
        event.preventDefault();
        setError({});

        try {
            setLoading(true);
            await api.get("/sanctum/csrf-cookie");
            await api.post("/api/create", {goal, deadline, steps});
            setSubmitted(true);
            navigate("/");
        } catch (error) {
            setError(error.response.data.errors);
        } finally {
            setLoading(false);
        }
    }

    function handleStepChange(index, value) {
        setSteps(prev => {
            const updated = [...prev];
            updated[index] = value;
            return updated;
        });
    }

    function addStep() {
        if (steps.length < 12) {
            setSteps(prev => [...prev, ""]);
        }
    }

    function removeStep(index) {
        setSteps(prev => prev.filter((_, i) => i !== index));
    }

    if (loading) {
        return <LoadingComponent/>
    }

    return (<>
        {submitted
            ? <p>Submitted</p>
            : (
                <Form onSubmit={handleSubmit} header='Set new Goal' buttonText='Set Goal'>

                    <InputField id="goal" label="Goal:" placeholder="Learn..." type="text" error={error}
                                onChange={(event) => setGoal(event.target.value)}/>

                    <InputField id="deadline" label="Deadline:" type="date" min={minDate} error={error}
                                onChange={(event) => setDeadline(event.target.value)}/>

                    <div className='my-2 w-full max-w-min space-y-1'>
                        {steps.map((step, index) => (
                            <div key={index} className='flex flex-row space-x-3'>
                                <InputField id={`step${index + 1}`} label={`Step ${index + 1}:`} type="text"
                                            value={steps[index]} error={error}
                                            onChange={(event) => handleStepChange(index, event.target.value)}/>
                                <span className="cursor-pointer" onClick={() => removeStep(index)}>❌</span>
                            </div>))}
                    </div>

                    {steps.length < 12 && <Button onclick={addStep} text='Add Step'/>}

                </Form>)
        }
    </>)
}