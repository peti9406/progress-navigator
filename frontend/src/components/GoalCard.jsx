import StepElement from "./StepElement.jsx";
import ProgressionBar from "./ProgressionBar.jsx";
import {useState} from "react";
import Button from "./Button.jsx";
import api from "../api/axios.js";

export default function GoalCard({goal, open, setOpen}) {
    const [completed, setCompleted] = useState(goal.completed);
    const [completedSteps, setCompletedSteps] = useState(goal.steps.filter((step) => step.completed === 1).length);
    const [achievedAt, setAchievedAt] = useState(goal.achieved_at || null);
    const [goalSteps, setGoalSteps] = useState(goal.steps);

    const steps = goal.steps.length;
    const percentage = Math.round(completedSteps / steps * 100);

    const today = new Date();
    const deadline = new Date(goal.deadline.replace(/\./g, '-'));
    const diffMs = deadline - today;
    const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    async function handleCompletion() {
        try {
            setCompletedSteps(steps);
            setCompleted(true);
            setAchievedAt(today.toISOString().slice(0, 10));
            setGoalSteps((prev) => {
                return prev.map((step) => ({...step, completed: 1}));
            });

            await api.get('/sanctum/csrf-cookie');
            await api.put(`/api/goals/${goal.id}`);
        } catch (error) {
            console.log(error);
        }
    }

    return <div  className={`${completed? 'bg-gray-400' : ''} border-2 rounded-lg m-4 p-4 w-full sm:w-[300px] max-h-min`}>
        <div className='cursor-pointer'
             onClick={setOpen}>

            <h1 className='text-xl font-bold border-b-1'>{goal.goal}</h1>

            {completed
                ? (<h2 className='italic text-sm'>Goal achieved: {achievedAt}</h2>)
                : daysLeft > 0 ? (
                    <h2 className='italic text-sm'>Days left: {daysLeft}</h2>
                ) : daysLeft === 0 ? (
                    <h2 className='italic text-sm text-yellow-500'>Deadline is today!</h2>
                ) : (
                    <h2 className='italic text-sm text-red-500'>Deadline passed {Math.abs(daysLeft)} days ago</h2>
                )}

            <p>{completedSteps} / {steps}</p>

            {!completed && <ProgressionBar percentage={percentage}/>}
        </div>

        <div className={`my-2 overflow-hidden transition-all duration-300 ${open ? "max-h-[2000px] mt-2" : "max-h-0"}`}>
            <ul className='mt-2'>
                {goalSteps.map(step => (
                    <StepElement key={step.id} step={step} onCheck={completed ? null : setCompletedSteps}/>
                ))}
            </ul>
        </div>

        {!completed && <Button onclick={handleCompletion} text='Complete'/>}
    </div>
}