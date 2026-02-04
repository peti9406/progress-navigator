import StepElement from "./StepElement";
import GoalHeader from "./GoalHeader";
import CompleteModal from "../modal/CompleteModal.jsx";

interface GoalProps {
    goal: GoalType;
    open: boolean;
    setOpen: (open: number | null) => void;
}

export default function Goal({goal, open, setOpen}: GoalProps) {
    const completedSteps: number = goal.steps.filter((step) => step.completed === 1).length;

    return (
        <div
            className={`${open ? 'rounded-lg shadow-md bg-[var(--surface-soft)] text-[var(--text)]' : ''} m-4 pb-1 border-b-1`}>

            <GoalHeader goal={goal} open={open} setOpen={setOpen} completedSteps={completedSteps}/>

            <ul className={`ml-8 overflow-hidden transition-all duration-500
                        ${open ? "max-h-96 opacity-100 my-2" : "max-h-0 opacity-0"}`}>
                {goal.steps.map((step) => (
                    <StepElement step={step} key={step.id} goalId={goal.id} goalCompleted={goal.completed}/>
                ))}
            </ul>

            {open && !goal.completed && completedSteps === goal.steps.length &&
                <span className='flex justify-center md:justify-start my-1 ml-6'>
                    <CompleteModal goal={goal.goal} id={goal.id}/>
                </span>
            }
        </div>
    )
}