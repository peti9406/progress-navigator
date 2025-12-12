export default function TableBody({children}) {

    return (
        <div
            className='w-full border-1 px-2 border-white/20 mt-4 rounded-lg bg-white/10 backdrop-blur-md shadow-md'>
            {children}
        </div>
    )
}