import {useContext} from "react";
import {GoalContext} from "../../contexts/GoalContext.js";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "./dropdown-menu.jsx";

export default function FilterSelect() {
    const {filterGoals} = useContext(GoalContext);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
        <span className='cursor-pointer bg-white/60 p-2 rounded-md'>
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