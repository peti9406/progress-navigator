import {Link} from 'react-router-dom'
import Button from "./Button.jsx";
import useAuth from "../hooks/useAuth.js";

export default function Navbar({onLogout}) {
    const {user} = useAuth();

    return (<div className='flex flex-row justify-center items-center w-full min-w-max
    bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200'>
            <Link to='/'>
                <Button text='Home' />
            </Link>
            {user ?
                (<>
                    <Link to='/create'>
                        <Button text='Set new goal'/>
                    </Link>
                    <div className='flex flex-row items-center ml-auto'>
                        <p>Hi {user}!</p>
                        <Button onclick={onLogout} text='Log out'/>
                    </div>
                </> )
                : (<>
                    <Link to='/register'>
                        <Button text='Register'/>
                    </Link>
                    <Link to='/login'>
                        <Button text='Sign in'/>
                    </Link>
                </>)}
        </div>
    )
}