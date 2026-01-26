import Button from "../ui/Button.jsx";
import {useContext, useState} from "react";
import {GoalContext} from "../../contexts/GoalContext.js";
import api from "../../api/axios.js";
import LoadingComponent from "../LoadingComponent.jsx";
import ErrorComponent from "../ErrorComponent.jsx";

export default function Assist({onSubmit}) {
    const [goalId, setGoalId] = useState('');
    const [problem, setProblem] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [advice, setAdvice] = useState(null);
    const {goals} = useContext(GoalContext);

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

    return (<>
        {submitted
            ? (<div>
                {loading && <LoadingComponent/>}

                {error && !loading && (
                    <ErrorComponent message={error}/>
                )}

                {!loading && advice && !error && (
                    <div className="max-h-[60vh] overflow-y-auto p-4 rounded-md bg-[var(--surface-soft)] shadow-md">
                        {advice?.reflection && (
                            <p className='mb-2 italic'>{advice.reflection}</p>
                        )}

                        {advice?.steps?.length > 0 && (
                            <ul className='space-y-4'>
                                {advice.steps.map((step, index) => (
                                    <li key={index}>{`${index + 1}. ${step}`}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>)
            : (<form className="flex flex-col" onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-2">
                    <label htmlFor='goal'>Select the goal you are stuck on</label>
                    <select id='goal'
                            value={goalId}
                            onChange={(e) => setGoalId(e.target.value)}
                            className='bg-[var(--primary-muted)]/20 border-1 border-[var(--primary-muted)]/40 p-2 rounded-md shadow-md'>
                        <option value='' disabled
                                className='bg-[var(--primary-muted)]/20 text-black'
                        >
                            Select a goal...
                        </option>

                        {goals.map(goal => (
                            <option key={goal.id} value={goal.id}
                                    className='bg-[var(--primary-muted)]/20 text-black'
                            >
                                {goal.goal}
                            </option>
                        ))}
                    </select>

                    <label htmlFor='problem'>Describe what is blocking you</label>
                    <textarea id='problem' onChange={(e) => setProblem(e.target.value)}
                              placeholder='I don’t know how to start the next step because…' maxLength='255'
                              className='bg-[var(--primary-muted)]/20 border-1 border-[var(--primary-muted)]/40 p-2 rounded-md shadow-md'/>
                </div>

                <div className="flex justify-center mt-8">
                    <Button type='submit' disabled={!goalId || loading}
                            className='w-1/2 md:w-1/3 bg-[var(--primary)] text-[var(--text-soft)] hover:bg-[var(--primary)]/70'>
                        Get help from Ai
                    </Button>
                </div>
            </form>)}
    </>)
}