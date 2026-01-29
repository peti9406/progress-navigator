export default function ErrorComponent({message}) {

    return (<div className="flex justify-center my-2 self-center mx-auto w-full max-w-xs text-wrap">
        <p className="text-red-600 font-bold">{message}</p>
    </div>)
}