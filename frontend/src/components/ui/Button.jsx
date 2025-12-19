export default function Button({onClick, children, type = "button", disabled = false}) {

    return <button onClick={onClick} type={type} disabled={disabled}
                   className='border-1 border-blue-900/90 rounded-sm m-1 p-1 bg-blue-900/90 text-white/90 font-bold hover:cursor-pointer
                   hover:translate-y-0.5 duration-300 hover:bg-gray-500 hover:border-gray-500'>
        {children}
        </button>
}