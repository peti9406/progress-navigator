import {ChangeEvent, JSX} from "react";

interface InputFieldProps {
    label: string,
    id: string
    type: "number" | "text" | "date" | "password" | "email";
    placeholder?: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    value: string | number;
    min?: number;
    size?: "small" | "normal";
    labelProps?: {
        className?: string,
    };
}

export default function InputField({label, id, type, placeholder, onChange, value, min, size = 'normal', labelProps = {}} : InputFieldProps) {

    return (<div className={`flex flex-row justify-between my-1 border-b border-[var(--border)] space-x-2 
    ${size === 'normal' ? 'md:max-w-lg md:min-w-lg w-full' : 'md:max-w-sm md:min-w-sm'} `}>
        <label htmlFor={id} {...labelProps} className={`text-nowrap text-left font-bold ${size === 'normal' ? 'w-1/2' : 'w-1/5'} ${labelProps.className || ''}`}>{label}</label>
        <input id={id} className={`border-l border-[var(--border)] bg-[var(--input)] px-1 ${size === 'normal' ? 'w-1/2' : 'w-3/4'}`} value={value} min={min}
               type={type} placeholder={placeholder} onChange={onChange} required autoComplete='true' />
    </div>)

}