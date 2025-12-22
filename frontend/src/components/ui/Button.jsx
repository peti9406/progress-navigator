export default function Button({onClick, className, children, type = "button", disabled = false}) {

    return <button onClick={onClick} type={type} disabled={disabled}
                   className={`font-bold rounded-md m-1 p-2 hover:cursor-pointer duration-300 ${className}`}>
        {children}
        </button>
}