import {useContext} from "react";
import {GoalContext} from "../../contexts/GoalContext.js";
import SortIcon from "../ui/SortIcon.jsx";

export default function TableHeader() {
    const {filter, sortGoals, sorted, sortBy} = useContext(GoalContext);

    function handleSort(sort) {
        sortGoals(sort);
    }

    return (
        <div
            className='flex items-center w-full min-w-min p-2  bg-blue-800 text-white rounded-lg font-bold shadow-md'>
                <span className='flex w-1/3'>
                    <p className='hover:underline cursor-pointer' onClick={() => handleSort('Goal List')}>
                        Goal List
                        <SortIcon direction={sorted} active={sortBy === "Goal List"} />
                    </p>
                </span>

            <div className='grid grid-cols-3 w-2/3'>
                <p className='mx-auto hover:underline cursor-pointer' onClick={() => handleSort(filter === 'Completed' ? 'Achieved At' : 'Deadline')}>
                    {filter === 'Completed' ? 'Achieved At' : 'Deadline'}
                    <SortIcon direction={sorted} active={sortBy === 'Deadline' || sortBy === 'Achieved At' } />
                </p>

                <p className='mx-auto hover:underline cursor-pointer' onClick={() => handleSort('Completed')}>
                    Completed
                    <SortIcon direction={sorted} active={sortBy === "Completed"} />
                </p>

                <p className='mx-auto hover:underline cursor-pointer' onClick={() => handleSort('Progression')}>
                    Progression
                    <SortIcon direction={sorted} active={sortBy === "Progression"} />
                </p>
            </div>
        </div>
    )
}