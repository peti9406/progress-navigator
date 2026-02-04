import {useEffect, useState} from "react";
import api from "../../api/axios.ts";
import LoadingComponent from "../LoadingComponent.tsx";
import ErrorComponent from "../ErrorComponent.tsx";
import AdviceView from "./AdviceView.jsx";
import FormView from "./FormView.jsx";

export default function Assist({onBack, onSubmit}) {
    const [goals, setGoals] = useState([]);
    const [goalId, setGoalId] = useState('');
    const [problem, setProblem] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [advice, setAdvice] = useState(null);

    useEffect(() => {
        async function fetchGoals() {
            setLoading(true);
            setError(null);
            try {
                await api.get('/sanctum/csrf-cookie');
                const {data} = await api.get('/api/goals?filter=Not Completed');
                setGoals(data.sort((a, b) => new Date(a.deadline) - new Date(b.deadline)));
            } catch (error) {
                setError(error.response?.data?.message || error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchGoals();
    }, [])

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            setSubmitted(true);
            const {data} = await api.post(`/api/goals/${goalId}/help`, {problem});

            if (data.error) {
                setError(data.error);
                setAdvice(null);
            } else if (Array.isArray(data.steps)) {
                setAdvice(data);
            } else {
                setError('Unexpected AI response. Please try again later.');
            }

            onSubmit();
        } catch (error) {
            setError(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <LoadingComponent/>
    }

    if (error) {
        return <ErrorComponent message={error}/>
    }

    return (
        <>
            {submitted
                ? <AdviceView advice={advice} loading={loading} onSubmit={() => setSubmitted(false)}/>
                : <FormView onSubmit={handleSubmit}
                            onSelect={(e) => setGoalId(e.target.value)}
                            onText={(e) => setProblem(e.target.value)}
                            onBack={onBack}
                            loading={loading}
                            goalId={goalId}
                            problem={problem}
                            goals={goals}
                />
            }
        < />
    )
}