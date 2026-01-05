export default function AdminTableHeader() {

    return (
        <div
            className='grid grid-cols-4 items-center w-full min-w-min p-2  bg-blue-800 text-white rounded-lg font-bold shadow-md '>
                <span className='inline-flex items-center mx-auto'>
                    <p className='hover:underline cursor-pointer'>
                        User Name
                    </p>
                </span>

                <span className='inline-flex items-center mx-auto'>
                    <p className='hover:underline cursor-pointer'>
                        Email
                    </p>
                </span>

                <span className='inline-flex items-center mx-auto'>
                    <p className='mx-auto hover:underline cursor-pointer inline-flex items-center'>
                    Date of Registration
                    </p>
                </span>

                <span className='inline-flex items-center mx-auto'>
                    <p className='mx-auto hover:underline cursor-pointer inline-flex items-center'>
                    Goals
                    </p>
                </span>
        </div>
    )
}