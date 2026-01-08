export default function TableBody({children}) {

    return (
        <div
            className='w-full border-1 px-2 border-[var(--surface-soft)]/20 mt-4 rounded-lg bg-[var(--surface)] backdrop-blur-md shadow-md'>
            {children}
        </div>
    )
}