import React, {forwardRef} from "react";

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    type?: "button" | "submit";
    disabled?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
    {
        onClick,
        className,
        children,
        type = "button",
        disabled = false
    },
    ref) => {
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
