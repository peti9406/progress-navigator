import {forwardRef} from "react";

const Button = forwardRef((
    {onClick, className, children, type = "button", disabled = false}, ref) => {
    return (
        <button
            ref={ref}
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={`font-bold rounded-lg p-2 text-nowrap backdrop-blur-md shadow-md cursor-pointer ${className}`}
        >
            {children}
        </button>
    );
});

export default Button;
