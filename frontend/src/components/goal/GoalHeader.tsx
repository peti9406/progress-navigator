import ProgressionBar from "./ProgressionBar";
import DeleteModal from "../modal/DeleteModal.js";
import ToolTipCustom from "../ui/ToolTipCustom.jsx";
import {GoalType} from "../../types/GoalType";

interface GoalHeaderProps {
    goal: GoalType;
    open: boolean;
    setOpen: (open: number) => void;
    completedSteps: number;
}

export default function GoalHeader({goal, open, setOpen, completedSteps}: GoalHeaderProps) {
    const steps: number = goal.steps.length;
    const percentage: number = Math.round(completedSteps / steps * 100);

    const today: Date = new Date();
    const deadline: Date = new Date(goal.deadline.replace(/\./g, '-'));
    const diffMs: number = deadline.valueOf() - today.valueOf();
    const daysLeft: number = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    return (
        <div onClick={() => {
            if (window.innerWidth < 768) {
                setOpen(goal.id);
            }
        }}
             className={`flex flex-col md:flex md:flex-row items-center w-full font-bold p-2 rounded-lg ${open ? 'bg-[var(--surface-muted)] border-1 border-[var(--surface-muted)] backdrop-blur-md ' : ''}`}>
            <div className='flex items-center md:w-1/3 gap-2'>
                <span onClick={(e) => {
                    e.stopPropagation();
                    setOpen(goal.id);
                }}
                      className='cursor-pointer hidden md:inline-block'>
                    {open
                        ? <i className="fa-solid fa-caret-down"></i>
                        : <i className="fa-solid fa-caret-right"></i>}
                </span>

                <span className='truncate'>{goal.goal}</span>
            </div>

            <div className='flex flex-col gap-y-2 md:grid grid-cols-[1fr_1fr_1fr_auto] w-2/3 items-center'>
                <span>
                        {goal.completed ? (
                                <h2>{goal.achieved_at}</h2>
                            )
                            : daysLeft > 0 ? (
                                <h2 className='text-sm text-[var(--text)]'>{daysLeft} days left!</h2>
                            ) : daysLeft === 0 ? (
                                <h2 className='text-sm text-yellow-500'>Deadline is today!</h2>
                            ) : (
                                <h2 className='text-sm text-[var(--destructive)]'>{Math.abs(daysLeft)} days late!</h2>
                            )}
                </span>

                <span>
                    {completedSteps} / {steps}
                </span>

                <ProgressionBar percentage={percentage}/>

                <ToolTipCustom tip='Delete Goal'>
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="flex"
                    >
                        <DeleteModal goal={goal.goal} id={goal.id}/>
                    </div>
                </ToolTipCustom>
            </div>
        </div>)
}