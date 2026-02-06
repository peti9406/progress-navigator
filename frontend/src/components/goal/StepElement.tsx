import {useContext} from "react";
import {GoalContext} from "../../contexts/GoalContext";
import {Step} from "../../types/Step";

interface StepElementProps {
    step: Step;
    goalId: number;
    goalCompleted: 0 | 1;
}

export default function StepElement({step, goalId, goalCompleted} : StepElementProps) {
    const {toggleStep} = useContext(GoalContext);

    async function handleCheck(): Promise<void> {
        try {
            await toggleStep(goalId, step.id);
        } catch (error) {
            console.log(error)
        }
    }

    return <li className='flex items-center space-x-6'>
        {!goalCompleted && <input className='cursor-pointer accent-[var(--primary)]'
                                  type='checkbox' checked={!!step.completed} onChange={handleCheck}/>}
        <p className='text-left text-wrap px-2'>{step.step}</p>
    </li>
}