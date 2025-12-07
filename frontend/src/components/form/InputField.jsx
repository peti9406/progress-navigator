export default function InputField({label, type, placeholder, onChange, value, min, size = 'normal'}) {

    return (<div className={`flex flex-row justify-between my-1 border-b border-gray-900 space-x-2 ${size === 'normal' ? 'max-w-lg min-w-lg' : 'max-w-sm min-w-sm'} `}>
        <label className={`text-nowrap text-left ${size === 'normal' ? 'w-1/2' : 'w-1/5'}`}>{label}</label>
        <input className={`border-l border-gray-900 px-1 ${size === 'normal' ? 'w-1/2' : 'w-3/4'}`} value={value} min={min}
               type={type} placeholder={placeholder} onChange={onChange} required/>
    </div>)

}