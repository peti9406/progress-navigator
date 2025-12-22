import {Link} from 'react-router-dom'
import Button from "./ui/Button.jsx";
import useAuth from "../hooks/useAuth.js";
import {useContext} from "react";
import {GoalContext} from "../contexts/GoalContext.js";

export default function Navbar({onLogout}) {
    const {user} = useAuth();

    return (<div className='flex flex-row justify-center items-center w-full min-w-max
    bg-b3d9ff'>
            {user ?
                (<>
                    <div className='flex flex-row ml-auto items-center space-x-4'>
                        <p className='font-bold'>Hi {user}!</p>
                        <Button onClick={onLogout} className='bg-blue-800 text-white hover:bg-blue-800/70'>
                            <i className="fa-solid fa-right-from-bracket"></i>
                        </Button>
                    </div>
                </> )
                : (<>
                    <Link to='/register'>
                        <Button className='bg-blue-800 text-white hover:bg-blue-800/70'>
                            Register
                        </Button>
                    </Link>
                    <Link to='/login'>
                        <Button className='bg-blue-800 text-white hover:bg-blue-800/70'>
                            Sign in
                        </Button>
                    </Link>
                </>)}
        </div>
    )
}