import {ArrowDown, ArrowUp} from "lucide-react";

export default function SortIcon({active, direction}) {

    return (
        <span className='inline-flex w-4 ml-1'>
                {direction === "Ascending"
                    ? <ArrowUp size={18} className={active ? 'opacity-60' : 'opacity-0'}/>
                    : <ArrowDown size={18} className={active ? 'opacity-60' : 'opacity-0'}/>
                }
        </span>)
}