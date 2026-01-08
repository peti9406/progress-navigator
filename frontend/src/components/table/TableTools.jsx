import {useContext} from "react";
import {GoalContext} from "../../contexts/GoalContext.js";
import NewGoalModal from "../modal/NewGoalModal.jsx";
import FilterSelect from "../ui/FilterSelect.jsx";

export default function TableTools() {
    const {filter, sortBy} = useContext(GoalContext);


    return (
        <div className='flex mb-2 font-bold w-full justify-between items-center'>
            <div className='space-x-4'>
                <span className='bg-[var(--surface)] p-2 border-1 border-[var(--surface)]/20 rounded-lg backdrop-blur-md shadow-md'>
                    Filtered by: {filter}
                </span>

                <FilterSelect/>

                <span className='bg-[var(--surface)] p-2 border-1 border-[var(--surface)]/20 rounded-lg backdrop-blur-md shadow-md'>
                    Sorted by: {sortBy}
                </span>
            </div>

            <NewGoalModal/>
        </div>
    )
}