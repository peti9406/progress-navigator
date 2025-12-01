export default function Button({text, type = "button"}) {

    return <button type={type} className='border-1 m-1 p-1 hover:cursor-pointer'>{text}</button>
}