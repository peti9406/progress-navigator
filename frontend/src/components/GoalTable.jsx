import Goal from "./Goal.jsx";
import {useState} from "react";

export default function GoalTable({goals}) {
    const [openGoalId, setOpenGoalId] = useState(null);

    return (
        <div className='mt-20 mx-50 max-w-full min-w-max'>
            <div className='flex items-center w-full min-w-min p-2  bg-blue-800 text-white rounded-lg font-bold shadow-md'>
                <span className='flex text-nowrap w-1/3'>
                    Goal List
                </span>

                <div className='grid grid-cols-3 w-2/3'>
                    <span>
                        Deadline
                    </span>
                    <span>
                        Completed
                    </span>
                    <span>
                        Progression
                    </span>
                </div>

            </div>

            <div className='w-full border-1 px-2 border-white/20 mt-4 rounded-lg bg-white/10 backdrop-blur-md shadow-md'>
                {goals.map(goal => (
                    <Goal key={goal.id} goal={goal} open={openGoalId === goal.id}
                             setOpen={() => setOpenGoalId(prev => (prev === goal.id ? null : goal.id))}/>
                ))}
            </div>
        </div>
    )
}