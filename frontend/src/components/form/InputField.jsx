import ErrorComponent from "../ErrorComponent.jsx";

export default function InputField({id, label, type, placeholder, onChange, error = {}}) {

    return (<div className="flex flex-col w-full max-w-xs text-nowrap">
            <div className="flex flex-row justify-between my-1">
                <label htmlFor={id}>{label}</label>
                <input type={type} id={id} name={id} placeholder={placeholder} onChange={onChange} required/>
            </div>
            {error?.[id] && <ErrorComponent message={error[id]}/>}
        </div>
    )
}