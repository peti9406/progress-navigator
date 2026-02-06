import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "./dropdown-menu";
import {useContext} from "react";
import {GoalContext} from "../../contexts/GoalContext.js";

export default function SortingSelect() {
    const {filter, sortGoals} = useContext(GoalContext);

    function handleSort(sort: string) {
        sortGoals(sort);
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <span
                    className='cursor-pointer bg-[var(--surface)] p-2 border-1 border-[var(--surface)]/20 rounded-lg backdrop-blur-md shadow-md'>
                    <i className="fa-solid fa-sort"></i>
                </span>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className={undefined}>
                <DropdownMenuItem className={undefined}
                                  onClick={() => handleSort('Goal List')}
                                  inset={undefined}>
                    Goal List
                </DropdownMenuItem>
                <DropdownMenuItem className={undefined}
                                  onClick={() => handleSort(filter === 'Completed' ? 'Achieved At' : 'Deadline')}
                                  inset={undefined}>
                    {filter === 'Completed' ? 'Achieved At' : 'Deadline'}
                </DropdownMenuItem>
                <DropdownMenuItem className={undefined}
                                  onClick={() => handleSort('Completed')}
                                  inset={undefined}>
                    Completed
                </DropdownMenuItem>
                <DropdownMenuItem className={undefined}
                                  onClick={() => handleSort('Progression')}
                                  inset={undefined}>
                    Progression
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}