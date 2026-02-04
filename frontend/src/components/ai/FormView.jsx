import Button from "../ui/Button.tsx";

export default function FormView({onSubmit, onSelect, onText, onBack, loading, goalId, problem, goals  }) {

    return (
        <form className="flex flex-col" onSubmit={onSubmit}>
            <div className="flex flex-col space-y-2">
                <label htmlFor='goal'>Select the goal you are stuck on</label>
                <select id='goal'
                        value={goalId}
                        onChange={onSelect}
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
                <textarea id='problem' onChange={onText}
                          placeholder='I don’t know how to start the next step because…' maxLength='255'
                          value={problem}
                          className='bg-[var(--primary-muted)]/20 border-1 border-[var(--primary-muted)]/40 p-2 rounded-md shadow-md'/>
            </div>

            <div className="flex flex-col-reverse items-center md:flex-row justify-between gap-4 mt-8">
                <Button disabled={loading} onClick={() => onBack('menu')}
                        className='w-1/2 md:w-1/3 bg-[var(--primary)] text-[var(--text-soft)] hover:bg-[var(--primary)]/70'>
                    Back
                </Button>
                <Button type='submit' disabled={!goalId || loading}
                        className='w-1/2 md:w-1/3 bg-[var(--complete)] text-[var(--text-soft)] hover:bg-[var(--complete)]/70'>
                    Get help from Ai
                </Button>
            </div>
        </form>
    )
}