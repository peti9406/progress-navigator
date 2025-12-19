import {useContext, useEffect, useRef, useState} from "react";
import {GoalContext} from "../contexts/GoalContext.js";

export default function FilterSelect(){
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const {filter, filterGoals} = useContext(GoalContext);
    const filterRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setIsFilterOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    async function handleFilter(event) {
        await filterGoals(event.target.value);
        setIsFilterOpen(false);
    }

    return (
        <div ref={filterRef} className='relative inline-block'>
                    <span onClick={() => setIsFilterOpen(prev => !prev)}
                          className='cursor-pointer bg-white/60 p-2 rounded-md'>
                    <i className="fa-solid fa-filter"></i><
                    /span>

            {isFilterOpen && (
                <select onChange={handleFilter} value={filter}
                        className='absolute top-full mt-2 left-0 bg-white rounded-md shadow-lg p-2'>
                    <option value='Completed'>Completed</option>
                    <option value='Not Completed'>Not Completed</option>
                </select>
            )}
        </div>
    )
}