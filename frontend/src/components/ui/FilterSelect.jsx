import {useContext} from "react";
import {GoalContext} from "../../contexts/GoalContext.js";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "./dropdown-menu.jsx";

export default function FilterSelect() {
    const {filterGoals} = useContext(GoalContext);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <span className='cursor-pointer bg-[var(--surface)] p-2 border-1 border-[var(--surface)]/20 rounded-lg backdrop-blur-md shadow-md'>
                    <i className="fa-solid fa-filter"></i>
                </span>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => filterGoals('Completed')}>
                    Completed
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => filterGoals('Not Completed')}>
                    Not Completed
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}