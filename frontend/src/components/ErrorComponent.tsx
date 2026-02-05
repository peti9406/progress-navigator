interface ErrorComponentProps {
    messages: string[];
}

export default function ErrorComponent({messages}: ErrorComponentProps) {

    return (<div className="flex flex-col justify-center items-center my-2 text-wrap">
        {messages.map((message, i) => (
            <p key={i} className="text-red-600 font-bold text-center">{message}</p>
        ))}
    </div>)
}