import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "./dropdown-menu.jsx";
import {useContext} from "react";
import {GoalContext} from "../../contexts/GoalContext.js";

export default function SortingSelect() {
    const {filter, sortGoals} = useContext(GoalContext);

    function handleSort(sort) {
        sortGoals(sort);
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <span className='cursor-pointer bg-[var(--surface)] p-2 border-1 border-[var(--surface)]/20 rounded-lg backdrop-blur-md shadow-md'>
                    <i className="fa-solid fa-sort"></i>
                </span>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => handleSort('Goal List')}>
                    Goal List
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort(filter === 'Completed' ? 'Achieved At' : 'Deadline')}>
                    {filter === 'Completed' ? 'Achieved At' : 'Deadline'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort('Completed')}>
                    Completed
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort('Progression')}>
                    Progression
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}