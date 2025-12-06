import {Link} from 'react-router-dom'
import Button from "./Button.jsx";
import useAuth from "../hooks/useAuth.js";

export default function Navbar({onLogout}) {
    const {user} = useAuth();

    return (<div className='flex flex-row justify-center items-center w-full min-w-max'>
            <Link to='/'>
                <Button text='Home' />
            </Link>
            {user ?
                (<>
                    <Link to='/create'>
                        <Button text='Set new goal'/>
                    </Link>
                    <Button onclick={onLogout} text='Log out'/>
                    <p>Logged in as: {user}!</p>
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