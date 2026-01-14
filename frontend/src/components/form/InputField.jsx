export default function InputField({label, id, type, placeholder, onChange, value, min, size = 'normal', labelProps = {}}) {

    return (<div className={`flex flex-row justify-between my-1 border-b border-[var(--border)] space-x-2 ${size === 'normal' ? 'max-w-lg min-w-lg' : 'max-w-sm min-w-sm'} `}>
        <label htmlFor={id} {...labelProps} className={`text-nowrap text-left font-bold ${size === 'normal' ? 'w-1/2' : 'w-1/5'} ${labelProps.className || ''}`}>{label}</label>
        <input id={id} className={`border-l border-[var(--border)] bg-[var(--input)] px-1 ${size === 'normal' ? 'w-1/2' : 'w-3/4'}`} value={value} min={min}
               type={type} placeholder={placeholder} onChange={onChange} required autoComplete='true' />
    </div>)

}