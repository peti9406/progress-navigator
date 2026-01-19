import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "./tooltip.jsx"

export default function ToolTipCustom({tip, children}) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div className='ml-1'>
                    {children}
                </div>
            </TooltipTrigger>
            <TooltipContent className='hidden md:block'>
                <p>{tip}</p>
            </TooltipContent>
        </Tooltip>
    )
}
