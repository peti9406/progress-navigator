import {useContext} from "react";
import {GoalContext} from "../../contexts/GoalContext.js";

export default function TableHeader() {
    const {filter, sortGoals} = useContext(GoalContext);

    function handleSort(sort) {
        sortGoals(sort);
        // const sort = sorted === 'Ascending' ? 'Descending' : 'Ascending';
        // sortGoals(sort);
    }

    return (
        <div
            className='flex items-center w-full min-w-min p-2  bg-blue-800 text-white rounded-lg font-bold shadow-md'>
                <span className='flex w-1/3'>
                    <p className='hover:underline cursor-pointer' onClick={() => handleSort('Goal List')}>
                        Goal List
                    </p>
                </span>

            <div className='grid grid-cols-3 w-2/3'>
                <p className='mx-auto hover:underline cursor-pointer' onClick={() => handleSort(filter === 'Completed' ? 'Achieved' : 'Deadline')}>
                    {filter === 'Completed' ? 'Achieved At' : 'Deadline'}
                </p>

                <p className='mx-auto hover:underline cursor-pointer' onClick={() => handleSort('Completed')}>
                    Completed
                </p>

                <p className='mx-auto hover:underline cursor-pointer' onClick={() => handleSort('Progression')}>
                    Progression
                </p>
            </div>
        </div>
    )
}