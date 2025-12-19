export default function ToolTip({tip, children}) {

    return (
        <div className='ml-1 relative inline-block group'>
            {children}

            <div
                className="
                absolute bottom-full left-1/2 -translate-x-1/2 mb-1
                bg-black text-white text-xs
                 px-2 py-1 rounded
                 whitespace-nowrap
                 opacity-0 scale-95
                 group-hover:opacity-100 group-hover:scale-100
                 transition-all duration-150
                 pointer-events-none">
                {tip}
            </div>
        </div>
    )
}