import {useContext} from "react";
import {GoalContext} from "../../contexts/GoalContext.js";
import NewGoalModal from "../modal/NewGoalModal.jsx";
import FilterSelect from "../ui/FilterSelect.jsx";

export default function TableTools() {
    const {filter, sortBy} = useContext(GoalContext);


    return (
        <div className='flex mb-2 font-bold w-full justify-between items-center'>
            <div className='space-x-4'>
                <span className='bg-white/60 rounded-md  p-2'>Filtered by: {filter}</span>

                <FilterSelect/>

                <span className='bg-white/60 rounded-md  p-2'>Sorted by: {sortBy}</span>
            </div>

            <NewGoalModal/>
        </div>
    )
}