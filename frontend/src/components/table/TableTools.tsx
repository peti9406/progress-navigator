import NewGoalModal from "../modal/NewGoalModal.js";
import FilterSelect from "../ui/FilterSelect.js";
import SortingSelect from "../ui/SortingSelect.js";
import AiModal from "../modal/AiModal.js";
import useGoals from "../../hooks/useGoals";

export default function TableTools() {
    const {filter, sortBy} = useGoals();

    return (
        <div className='px-2 md:px-0 flex flex-row mb-2 font-bold w-full justify-between items-center truncate'>
            <div className='space-x-4'>
                <span
                    className='hidden md:inline bg-[var(--surface)] p-2 border-1 border-[var(--surface)]/20 rounded-lg backdrop-blur-md shadow-md'>
                    Filtered by: {filter}
                </span>

                <FilterSelect/>

                <span
                    className='hidden md:inline bg-[var(--surface)] p-2 border-1 border-[var(--surface)]/20 rounded-lg backdrop-blur-md shadow-md'>
                    Sorted by: {sortBy}
                </span>

                <span className='md:hidden'>
                    <SortingSelect/>
                </span>
            </div>

            <div className='flex items-center justify-between space-x-4'>
                <AiModal/>
                <NewGoalModal/>
            </div>
        </div>
    )
}