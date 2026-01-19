export default function UserTableHeader() {

    return (
        <div
            className='hidden md:grid grid-cols-4 items-center w-full min-w-min p-2 bg-[var(--primary)] text-[var(--text-soft)] rounded-lg font-bold shadow-md '>
                    <p className='hover:underline cursor-pointer truncate'>
                        User Name
                    </p>

                    <p className='hover:underline cursor-pointer truncate'>
                        Email
                    </p>

                    <p className='hover:underline cursor-pointer truncate'>
                    Date of Registration
                    </p>

                    <p className='hover:underline cursor-pointer truncate'>
                    Goals
                    </p>
        </div>
    )
}