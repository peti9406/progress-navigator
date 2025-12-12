import Goal from "../goal/Goal.jsx";
import {useContext} from "react";
import {GoalContext} from "../../contexts/GoalContext.js";

export default function TableHeader() {
    const {filter} = useContext(GoalContext);

    return (
        <div
            className='flex items-center w-full min-w-min p-2  bg-blue-800 text-white rounded-lg font-bold shadow-md'>
                <span className='flex text-nowrap w-1/3'>
                    Goal List
                </span>

            <div className='grid grid-cols-3 w-2/3'>
                    <span>
                        {filter === 'Completed' ? 'Achieved At' : 'Deadline'}
                    </span>
                <span>
                        Completed
                    </span>
                <span>
                        Progression
                    </span>
            </div>
        </div>
    )
}