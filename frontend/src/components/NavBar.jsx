import {Link} from 'react-router-dom'
import Button from "./Button.jsx";
import useAuth from "../hooks/useAuth.js";
import {useContext} from "react";
import {GoalContext} from "../contexts/GoalContext.js";

export default function Navbar({onLogout}) {
    const {user} = useAuth();
    const {setError} = useContext(GoalContext);

    return (<div className='flex flex-row justify-center items-center w-full min-w-max
    bg-b3d9ff'>
            <Link to='/'>
                <Button onclick={() => setError(null)} text='Home' />
            </Link>
            {user ?
                (<>
                    <div className='flex flex-row items-center ml-auto space-x-4'>
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