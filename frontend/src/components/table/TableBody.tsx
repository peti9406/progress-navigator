import React from "react";

interface TableBodyProps {
    children?: React.ReactNode
}

export default function TableBody({children}: TableBodyProps) {

    return (
        <div
            className='w-full border-1 md:px-2 border-[var(--surface-soft)]/20 mt-4 rounded-lg bg-[var(--surface)] backdrop-blur-md shadow-md'>
            {children}
        </div>
    )
}