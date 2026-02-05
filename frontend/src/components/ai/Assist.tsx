import React, {useEffect, useState} from "react";
import api from "../../api/axios";
import LoadingComponent from "../LoadingComponent";
import ErrorComponent from "../ErrorComponent";
import AdviceView from "./AdviceView";
import FormView from "./FormView";
import handleError from "../../utils/HandleError";
import {GoalResponseSchema, GoalType} from "../../types/GoalType";
import {AiAdviceType, AdviceTypeSchema} from "../../types/AiAdviceType";

interface AssistProps {
    onViewChange: (view: string) => void;
}

export default function Assist({onViewChange}: AssistProps) {
    const [goals, setGoals] = useState<GoalType[]>([]);
    const [goalId, setGoalId] = useState<string>('');
    const [problem, setProblem] = useState<string>('');
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string[]>([]);
    const [advice, setAdvice] = useState<AiAdviceType | null>(null);

    useEffect(() => {
        async function fetchGoals() {
            setLoading(true);
            setError([]);
            try {
                await api.get('/sanctum/csrf-cookie');
                const {data} = await api.get('/api/goals?filter=Not Completed');
                const parsed = GoalResponseSchema.safeParse(data);

                if (parsed.success) {
                    setGoals(
                        parsed.data.sort(
                            (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
                        )
                    );
                } else {
                    setError(['The incoming data structure was invalid'])
                }

            } catch (error) {
                handleError(error, setError);
            } finally {
                setLoading(false);
            }
        }

        fetchGoals();
    }, [])

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError([]);

        try {
            const {data} = await api.post(`/api/goals/${goalId}/help`, {problem});
            const parsed = AdviceTypeSchema.safeParse(data);

            if (parsed.success) {
                setAdvice(parsed.data);
            } else {
                setError(['Unexpected AI response. Please try again later.']);
                return;
            }

            setSubmitted(true);
            onViewChange('assisted');
        } catch (error) {
            handleError(error, setError);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <LoadingComponent/>
    }

    if (error.length > 0) {
        return <ErrorComponent messages={error}/>
    }

    return (
        <>
            {submitted && advice
                ? <AdviceView advice={advice} loading={loading} onBack={() => setSubmitted(false)}/>
                : <FormView onSubmit={handleSubmit}
                            onSelect={(e) => setGoalId(e.target.value)}
                            onText={(e) => setProblem(e.target.value)}
                            onViewChange={onViewChange}
                            loading={loading}
                            goalId={goalId}
                            problem={problem}
                            goals={goals}
                />
            }
        </>
    )
}