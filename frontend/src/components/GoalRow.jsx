import StepElement from "./StepElement.jsx";
import GoalHeader from "./GoalHeader.jsx";

export default function GoalRow({goal, open, setOpen}) {

    return (
        <div className={`${open ? 'bg-white/20 border-1 border-white/40 rounded-md shadow-md' : ''} m-4`}>

            <GoalHeader goal={goal} open={open} setOpen={setOpen}/>

            <ul className={`ml-8 overflow-hidden transition-all duration-700
                        ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                {goal.steps.map((step, i) => (
                    <StepElement step={step} key={i}/>
                ))}
            </ul>

        </div>
    )
}