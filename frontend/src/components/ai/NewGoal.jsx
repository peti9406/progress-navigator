import {useState} from "react";
import Button from "../ui/Button.jsx";
import api from "../../api/axios.js";
import LoadingComponent from "../LoadingComponent.jsx";
import ErrorComponent from "../ErrorComponent.jsx";
import NewGoalForm from "../goal/NewGoalForm.jsx";
import {nanoid} from "nanoid";

export default function NewGoal({onSubmit, onOpen}) {
    const [goal, setGoal] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [newGoal, setNewGoal] = useState(null);
    const [view, setView] = useState('get')

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setView('get');

        try {
            setSubmitted(true);
            const {data} = await api.post(`/api/goals/ai-new-goal`, {goal});

            if (data.error) {
                setError(data.error);
                setNewGoal(null);
            } else if (Array.isArray(data.steps)) {
                setNewGoal(data);
                onSubmit();
            } else {
                setError('Unexpected AI response.')
            }

        } catch (e) {
            setError('AI service is currently unavailable, try again later.');
        } finally {
            setLoading(false);
        }
    }

    function handleSetGoal() {
        setNewGoal((prev) => ({
            ...prev,
            steps: prev.steps.map((step) => ({
                id: nanoid(),
                value: step.step,
            }))
        }));

        setView('set');
    }

    return (
        <>
            {submitted
                ? (<>
                    {loading && <LoadingComponent/>}

                    {error && !loading && (
                        <ErrorComponent message={error}/>
                    )}

                    {!loading && newGoal && !error && view === 'get' && (
                        <>
                            <div
                                className="max-h-[60vh] overflow-y-auto p-4 rounded-md bg-[var(--surface-soft)] shadow-md">
                                {newGoal?.goal && (
                                    <p className='mb-2 font-bold'>{newGoal.goal}</p>
                                )}

                                {newGoal?.steps?.length > 0 && (
                                    <ul className='space-y-4'>
                                        {newGoal.steps.map((step, index) => (
                                            <li key={index}>{`${index + 1}. ${step.step}: ${step.description}`}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div className='flex items-center justify-center mt-4'>
                                <Button onClick={handleSetGoal}
                                    className='w-1/2 md:w-1/3 bg-[var(--complete)] text-[var(--text-soft)] hover:bg-[var(--complete)]/70'>
                                    Set goal
                                </Button>
                            </div>
                        </>
                    )}

                    {!loading && newGoal && !error && view === 'set' && (
                        <NewGoalForm aiGoal={newGoal.goal} aiSteps={newGoal.steps} onOpen={onOpen} />
                    )}
                </>)
                : <form onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor='new-goal'>Describe your goal</label>
                        <textarea id='new-goal' onChange={(e) => setGoal(e.target.value)}
                                  placeholder='I want to learn...' maxLength='50' minLength='6'
                                  value={goal}
                                  className='bg-[var(--primary-muted)]/20 border-1 border-[var(--primary-muted)]/40 p-2 rounded-md shadow-md'/>
                    </div>

                    <div className="flex justify-center mt-8">
                        <Button type='submit' disabled={!goal || loading}
                                className='w-1/2 md:w-1/3 bg-[var(--complete)] text-[var(--text-soft)] hover:bg-[var(--complete)]/70'>
                            Generate steps
                        </Button>
                    </div>
                </form>}
        </>
    )
}