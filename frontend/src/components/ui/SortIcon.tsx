import {ArrowDown, ArrowUp} from "lucide-react";
import {SortOrder} from "../../types/SortOrder";
import {JSX} from "react";

interface SortIconProps {
    direction: SortOrder;
    active: boolean;
}

export default function SortIcon({active, direction}: SortIconProps): JSX.Element {

    return (
        <span className='inline-flex w-4 ml-1'>
                {direction === "Ascending"
                    ? <ArrowUp size={18} className={active ? 'opacity-60' : 'opacity-0'}/>
                    : <ArrowDown size={18} className={active ? 'opacity-60' : 'opacity-0'}/>
                }
        </span>)
}