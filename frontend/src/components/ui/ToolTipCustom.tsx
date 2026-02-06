import {
    Tooltip,
    TooltipTrigger,
    TooltipContent, TooltipProvider,
} from "./tooltip";
import {ReactNode} from "react";

interface TooltipProps {
    tip: string;
    children: ReactNode;
}

export default function ToolTipCustom({tip, children}: TooltipProps) {
    return (
        <TooltipProvider>
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
        </TooltipProvider>
    )
}
