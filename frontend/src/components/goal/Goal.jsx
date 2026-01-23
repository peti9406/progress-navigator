import StepElement from "./StepElement.jsx";
import GoalHeader from "./GoalHeader.jsx";
import {GoalContext} from "../../contexts/GoalContext";
import CompleteModal from "../modal/CompleteModal.jsx";
import Button from "../ui/Button.jsx";
import api from "../../api/axios.js";

export default function Goal({goal, open, setOpen}) {
    const completedSteps = goal.steps.filter((step) => step.completed === 1).length;

    async function getHelp(id) {
        try {
            const {data} = await api.post(`/api/goals/${id}/help`);
            console.log(help);
        } catch (error) {
            console.log(error);
        }
    }

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

            {open && !goal.completed && completedSteps < goal.steps.length &&
                <span className='flex justify-center md:justify-start my-1 ml-6'>
                    <Button onClick={() => getHelp(goal.id)} className='bg-[var(--primary)] text-[var(--text-soft)] hover:bg-[var(--primary)]/70'>Help</Button>
                </span>
            }

            {open && !goal.completed && completedSteps === goal.steps.length &&
                <span className='flex justify-center md:justify-start my-1 ml-6'>
                    <CompleteModal goal={goal.goal} id={goal.id}/>
                </span>
            }
        </div>
    )
}