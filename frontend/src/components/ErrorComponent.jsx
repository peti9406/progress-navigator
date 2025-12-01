export default function ErrorComponent({message}) {

    return (<div className="my-2 self-center mx-auto overflow-hidden">
        <p className="text-red-600 font-bold truncate">{message}</p>
    </div>)
}