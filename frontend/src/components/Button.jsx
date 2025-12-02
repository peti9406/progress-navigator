export default function Button({onclick, text, type = "button"}) {

    return <button onClick={onclick} type={type} className='border-1 m-1 p-1 hover:cursor-pointer'>{text}</button>
}