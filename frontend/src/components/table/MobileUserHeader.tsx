export default function MobileUserHeader() {
    return (
        <div
            className='md:hidden flex flex-col gap-1 p-2 bg-[var(--primary)] text-[var(--text-soft)] border-b-1 font-bold shadow-md'>
            <p>
                Name
            </p>

            <p>
                Email
            </p>

            <p>
                Registration
            </p>

            <p>
                Goals
            </p>
        </div>
    )
}