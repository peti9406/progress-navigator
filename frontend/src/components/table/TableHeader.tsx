import SortIcon from "../ui/SortIcon.js";
import useGoals from "../../hooks/useGoals";
import {SortBy} from "../../types/SortBy";

export default function TableHeader() {
    const {filter, sortGoals, sorted, sortBy} = useGoals();

    function handleSort(sort: SortBy) {
        sortGoals(sort);
    }

    return (
        <div
            className='hidden md:flex items-center w-full min-w-min p-2 rounded-lg font-bold shadow-md
            bg-[var(--primary)] text-[var(--text-soft)]'>
                <span className='flex justify-center w-1/3 items-center'>
                    <p className='hover:underline cursor-pointer' onClick={() => handleSort('Goal List')}>
                        Goal List
                    </p>
                        <SortIcon direction={sorted} active={sortBy === "Goal List"}/>
                </span>

            <div className='grid grid-cols-3 w-2/3'>
                <span className='inline-flex items-center mx-auto'>
                    <p className='hover:underline cursor-pointer'
                       onClick={() => handleSort(filter === 'Completed' ? 'Achieved At' : 'Deadline')}>
                        {filter === 'Completed' ? 'Achieved At' : 'Deadline'}
                    </p>
                    <SortIcon direction={sorted} active={sortBy === 'Deadline' || sortBy === 'Achieved At'}/>
                </span>

                <span className='inline-flex items-center mx-auto'>
                    <p className='hover:underline cursor-pointer inline-flex items-center'
                       onClick={() => handleSort('Completed')}>
                    Completed
                    </p>
                    <SortIcon direction={sorted} active={sortBy === "Completed"}/>
                </span>

                <span className='inline-flex items-center mx-auto'>
                    <p className='hover:underline cursor-pointer inline-flex items-center'
                       onClick={() => handleSort('Progression')}>
                    Progression
                    </p>
                    <SortIcon direction={sorted} active={sortBy === "Progression"}/>
                </span>
            </div>
        </div>
    )
}