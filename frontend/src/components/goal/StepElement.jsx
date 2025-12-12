import {useContext} from "react";
import {GoalContext} from "../../contexts/GoalContext.js";

export default function StepElement({step, goalId, goalCompleted}) {
    const {toggleStep} = useContext(GoalContext);

    async function handleCheck() {
        try {
            await toggleStep(goalId, step.id);
        } catch (error) {
            console.log(error)
        }
    }

    return <li className='flex items-center space-x-6'>
        {!goalCompleted && <input className='cursor-pointer' type='checkbox' checked={!!step.completed} onChange={handleCheck}/>}
        <p className='text-left text-wrap px-2'>{step.step}</p>
    </li>
}