import ProgressionBar from "./ProgressionBar.jsx";
import {useState} from "react";

export default function GoalHeader({goal, open, setOpen}) {
    const [completed, setCompleted] = useState(goal.completed);
    const [completedSteps, setCompletedSteps] = useState(goal.steps.filter((step) => step.completed === 1).length);

    const steps = goal.steps.length;
    const percentage = Math.round(completedSteps / steps * 100);

    const today = new Date();
    const deadline = new Date(goal.deadline.replace(/\./g, '-'));
    const diffMs = deadline - today;
    const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    return (
        <div className={`flex items-center w-full font-bold p-2 rounded-md ${open ? 'bg-white/5 border-1 border-white/5 backdrop-blur-md ' : ''}`}>
            <div className='flex items-center w-1/2 gap-2'>
                    <span onClick={() => setOpen(goal.id)}
                          className='cursor-pointer'>
                        {open ? '⬇️' : '➡️'}
                    </span>

                <span>{goal.goal}</span>
            </div>

            <div className='grid grid-cols-3 w-1/2'>
                <span>
                        {daysLeft > 0 ? (
                            <h2 className=' text-sm'>{daysLeft} days left!</h2>
                        ) : daysLeft === 0 ? (
                            <h2 className='text-sm text-yellow-500'>Deadline is today!</h2>
                        ) : (
                            <h2 className=' text-sm text-red-500'>{Math.abs(daysLeft)} days late!</h2>
                        )}
                </span>

                <span>
                        {completedSteps} / {steps}
                </span>

                <span>
                        {!completed && <ProgressionBar percentage={percentage}/>}
                </span>
            </div>
        </div>)
}