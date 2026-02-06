import CustomButton from "../ui/CustomButton";
import React, {ChangeEvent} from "react";
import {GoalType} from "../../types/GoalType";

interface FormViewProps {
    onSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void;
    onSelect: (event: ChangeEvent<HTMLSelectElement>) => void;
    onText: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    onViewChange: (view: string) => void;
    loading: boolean;
    goalId: string;
    problem: string;
    goals: GoalType[]
}

export default function FormView({onSubmit, onSelect, onText, onViewChange, loading, goalId, problem, goals  }: FormViewProps) {

    return (
        <form className="flex flex-col" onSubmit={onSubmit}>
            <div className="flex flex-col space-y-2">
                <label htmlFor='goal'>Select the goal you are stuck on</label>
                <select id='goal'
                        value={goalId}
                        onChange={onSelect}
                        className='bg-[var(--primary-muted)]/20 border-1 border-[var(--primary-muted)]/40 p-2 rounded-md shadow-md w-full max-w-full overflow-hidden truncate'>
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
                          placeholder='I don’t know how to start the next step because…' maxLength={255}
                          value={problem}
                          className='bg-[var(--primary-muted)]/20 border-1 border-[var(--primary-muted)]/40 p-2 rounded-md shadow-md'/>
            </div>

            <div className="flex flex-col-reverse items-center md:flex-row justify-between gap-4 mt-8">
                <CustomButton disabled={loading} onClick={() => onViewChange('menu')}
                              className='w-1/2 md:w-1/3 bg-[var(--primary)] text-[var(--text-soft)] hover:bg-[var(--primary)]/70'>
                    Back
                </CustomButton>
                <CustomButton type='submit' disabled={!goalId || loading}
                              className='w-1/2 md:w-1/3 bg-[var(--complete)] text-[var(--text-soft)] hover:bg-[var(--complete)]/70'>
                    Get help from Ai
                </CustomButton>
            </div>
        </form>
    )
}