import StepElement from "./StepElement.jsx";
import GoalHeader from "./GoalHeader.jsx";
import {GoalContext} from "../../contexts/GoalContext";
import CompleteModal from "../modal/CompleteModal.jsx";
import Button from "../Button.jsx";

export default function Goal({goal, open, setOpen}) {
    const completedSteps = goal.steps.filter((step) => step.completed === 1).length;

    const openStyle = 'bg-white/20 border-1 border-white/40 rounded-md shadow-md';
    const completedStyle = 'bg-gray-400 border-1 border-gray-500 rounded-md shadow-md';

    return (
        <div className={`${open ? goal.completed ? completedStyle : openStyle : ''} m-4`}>

            <GoalHeader goal={goal} open={open} setOpen={setOpen} completedSteps={completedSteps}/>

            <ul className={`ml-8 overflow-hidden transition-all duration-500
                        ${open ? "max-h-96 opacity-100 my-2" : "max-h-0 opacity-0"}`}>
                {goal.steps.map((step) => (
                    <StepElement step={step} key={step.id} goalId={goal.id} goalCompleted={goal.completed}/>
                ))}
            </ul>

            {open && !goal.completed && completedSteps === goal.steps.length &&
                <span className='flex justify-start my-2 ml-6'>
                <CompleteModal goal={goal.goal} id={goal.id}/>
            </span>}
        </div>
    )
}