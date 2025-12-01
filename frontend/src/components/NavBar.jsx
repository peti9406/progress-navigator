import {Link} from 'react-router-dom'
import Button from "./Button.jsx";

export default function Navbar() {

    return (<div className='flex flex-row justify-center'>
            <Link to="/register">
                <Button text='Register'/>
            </Link>
            <Link to='/login'>
                <Button text='Sign in'/>
            </Link>
        </div>
    )
}