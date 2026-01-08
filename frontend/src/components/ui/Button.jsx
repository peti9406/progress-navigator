export default function Button({onClick, className, children, type = "button", disabled = false}) {

    return <button onClick={onClick} type={type} disabled={disabled}
                   className={`font-bold rounded-lg m-1 p-2 backdrop-blur-md shadow-md cursor-pointer ${className}`}>
        {children}
        </button>
}