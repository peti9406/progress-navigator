import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "./dropdown-menu";
import useGoals from "../../hooks/useGoals";

export default function FilterSelect() {
    const {filterGoals} = useGoals();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <span
                    className='cursor-pointer bg-[var(--surface)] p-2 border-1 border-[var(--surface)]/20 rounded-lg backdrop-blur-md shadow-md'>
                    <i className="fa-solid fa-filter"></i>
                </span>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className={undefined}>
                <DropdownMenuItem onClick={() => filterGoals('Completed')}
                                  className={undefined} inset={undefined}>
                    Completed
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => filterGoals('Not Completed')}
                                  className={undefined}
                                  inset={undefined}
                >
                    Not Completed
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}