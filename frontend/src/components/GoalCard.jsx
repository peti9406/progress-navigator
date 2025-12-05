import StepElement from "./StepElement.jsx";
import ProgressionBar from "./ProgressionBar.jsx";

export default function GoalCard({goal}) {
    const completed = goal.steps.filter((step) => step.completed === 1).length;
    const steps = goal.steps.length;
    const percentage = Math.round(completed / steps * 100);

    return <div className='border-2 rounded-lg m-4 p-4 max-w-max'>
        <h1 className='text-xl font-bold border-b-1'>{goal.goal}</h1>
        <p>{completed} / {steps}</p>

        <ProgressionBar percentage={percentage}/>

        <ul className='mt-2'>
            {goal.steps.map(step => <StepElement key={step.id} step={step}/>)}
        </ul>
    </div>
}