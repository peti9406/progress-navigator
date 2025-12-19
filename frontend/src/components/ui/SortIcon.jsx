import {ArrowDown, ArrowUp} from "lucide-react";

export default function SortIcon({active, direction})
{
    if (!active) return null;

    return direction === "Ascending"
        ? <ArrowUp size={16} opacity='80' className='inline ml-1'/>
        : <ArrowDown size={16} opacity='80' className='inline ml-1' />;
}