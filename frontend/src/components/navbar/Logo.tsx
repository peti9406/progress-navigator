import {Link} from "react-router-dom";

export default function Logo() {
    return (
        <div className='flex items-center'>
            <Link to='/'>
                <img src="/icon.png" alt='logo' className='w-10 md:w-15'/>
            </Link>
            <h1 className='text-lg font-bold md:text-2xl text-nowrap'>Progress Navigator</h1>
        </div>
    )
}