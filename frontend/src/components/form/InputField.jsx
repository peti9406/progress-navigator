import ErrorComponent from "../ErrorComponent.jsx";

export default function InputField({id, label, type, placeholder, onChange, value, min, error = {}}) {

    return (<div className="flex flex-col w-full max-w-xs text-nowrap">
            <div className="flex flex-row justify-between my-1 border-b border-gray-900 space-x-2">
                <label htmlFor={id}>{label}</label>
                <input className='border-l border-gray-900 px-1' value={value} min={min}
                    type={type} id={id} name={id} placeholder={placeholder} onChange={onChange} required/>
            </div>
            {error?.[id] && <ErrorComponent message={error[id]}/>}
        </div>
    )
}