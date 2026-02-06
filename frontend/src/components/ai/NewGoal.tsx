import React, {useState} from "react";
import CustomButton from "../ui/CustomButton";
import api from "../../api/axios";
import LoadingComponent from "../LoadingComponent";
import ErrorComponent from "../ErrorComponent";
import NewGoalForm from "../goal/NewGoalForm";
import {nanoid} from "nanoid";
import {AiNewGoal, AiNewGoalTypeSchema} from "../../types/AiNewGoal";
import handleError from "../../utils/HandleError";

interface NewGoalProps {
    onViewChange: (view: string) => void;
    onSet: () => void;
}

export default function NewGoal({onViewChange, onSet}: NewGoalProps) {
    const [goal, setGoal] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string[]>([]);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [newGoal, setNewGoal] = useState<AiNewGoal | null>(null);
    const [sortableSteps, setSortableSteps] = useState<SortableStep[]>([]);
    const [view, setView] = useState<string>('get')

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError([]);
        setView('get');

        try {
            setSubmitted(true);
            const {data} = await api.post(`/api/goals/ai-new-goal`, {goal});
            const parsed = AiNewGoalTypeSchema.safeParse(data);

            if (parsed.success) {
                setNewGoal(parsed.data);
                onViewChange('generated');
            } else {
                setError([data?.error || 'Unexpected AI response'])
                return;
            }
        } catch (error) {
            handleError(error, setError, 'AI service is currently unavailable, try again later.');
        } finally {
            setLoading(false);
        }
    }

    function handleSetGoal() {
        if (newGoal) {
            const steps = newGoal.steps.map((step) => ({
                id: nanoid(),
                value: step.step,
            }));

            setSortableSteps(steps);
            setView('set');
        }
    }

    if (error.length > 0) {
        return <ErrorComponent messages={error}/>;
    }

    if (loading) {
        return <LoadingComponent/>;
    }

    return (
        <>
            {submitted
                ? (<>
                    {newGoal && view === 'get' && (
                        <>
                            <div
                                className="max-h-[60vh] overflow-y-auto p-4 rounded-md bg-[var(--surface-soft)] shadow-md">
                                {newGoal.goal && (
                                    <p className='mb-2 font-bold'>{newGoal.goal}</p>
                                )}

                                {newGoal.steps.length > 0 && (
                                    <ul className='space-y-4'>
                                        {newGoal.steps.map((step, index) => (
                                            <li key={index}>{`${index + 1}. ${step.step}: ${step.description || 'No description provided by AI'}`}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div className='flex flex-col-reverse md:flex-row items-center justify-between gap-4 mt-4'>
                                <CustomButton disabled={loading} onClick={() => setSubmitted(false)}
                                              className='w-1/2 md:w-1/3 bg-[var(--primary)] text-[var(--text-soft)] hover:bg-[var(--primary)]/70'>
                                    Back
                                </CustomButton>
                                <CustomButton onClick={handleSetGoal}
                                              className='w-1/2 md:w-1/3 bg-[var(--complete)] text-[var(--text-soft)] hover:bg-[var(--complete)]/70'>
                                    Set goal
                                </CustomButton>
                            </div>
                        </>
                    )}

                    {newGoal && view === 'set' && (
                        <NewGoalForm aiGoal={newGoal.goal} aiSteps={sortableSteps} onSet={onSet}/>
                    )}
                </>)
                : <form onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor='new-goal'>Describe your goal</label>
                        <textarea id='new-goal' onChange={(e) => setGoal(e.target.value)}
                                  placeholder='I want to learn...' maxLength={50} minLength={6}
                                  value={goal}
                                  className='bg-[var(--primary-muted)]/20 border-1 border-[var(--primary-muted)]/40 p-2 rounded-md shadow-md'/>
                    </div>

                    <div className="flex flex-col-reverse items-center gap-4 md:flex-row justify-between mt-8">
                        <CustomButton disabled={loading} onClick={() => onViewChange('menu')}
                                      className='w-1/2 md:w-1/3 bg-[var(--primary)] text-[var(--text-soft)] hover:bg-[var(--primary)]/70'>
                            Back
                        </CustomButton>
                        <CustomButton type='submit' disabled={!goal || loading}
                                      className='w-1/2 md:w-1/3 bg-[var(--complete)] text-[var(--text-soft)] hover:bg-[var(--complete)]/70'>
                            Generate steps
                        </CustomButton>
                    </div>
                </form>}
        </>
    )
}