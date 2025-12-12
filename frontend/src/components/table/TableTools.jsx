import {Link} from "react-router-dom";
import Button from "../Button.jsx";
import {useContext, useState} from "react";
import {GoalContext} from "../../contexts/GoalContext.js";

export default function TableTools() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const {setError,filter, sorted, filterGoals, sortGoals} = useContext(GoalContext);

    async function handleFilter(event) {
        await filterGoals(event.target.value);
    }

    function handleSort() {
        const sort = sorted === 'Ascending' ? 'Descending' : 'Ascending';
        sortGoals(sort);
    }

    return (
        <div className='flex mb-2 font-bold w-full justify-between items-center'>
            <div className='space-x-4'>
                <span className='bg-white/60 rounded-md  p-2'>Filtered by: {filter}</span>
                <span onClick={() => setIsFilterOpen(true)} className='cursor-pointer bg-white/60 p-2 rounded-md'><i
                    className="fa-solid fa-filter"></i></span>
                {isFilterOpen && (
                    <select onChange={handleFilter} value={filter}>
                        <option value='Completed'>Completed</option>
                        <option value='Not Completed'>Not Completed</option>
                    </select>
                )}

                <span className='bg-white/60 rounded-md  p-2'>Sorted by: {sorted} Deadline</span>
                <span onClick={handleSort} className='cursor-pointer bg-white/60 p-2 rounded-md'><i
                    className="fa-solid fa-sort"></i></span>
            </div>

            <span>
                    <Link to='/create'>
                        <Button onclick={() => setError(null)} text='Set new goal'/>
                    </Link>
                </span>
        </div>
    )
}