import {Link} from 'react-router-dom'
import Button from "./ui/Button.jsx";
import useAuth from "../hooks/useAuth.js";
import {useContext} from "react";
import {GoalContext} from "../contexts/GoalContext.js";

export default function Navbar({onLogout}) {
    const {user} = useAuth();
    const {setError} = useContext(GoalContext);

    return (<div className='flex flex-row justify-center items-center w-full min-w-max
    bg-b3d9ff'>
            <Link to='/'>
                <Button onClick={() => setError(null)}>
                    Home
                </Button>
            </Link>
            {user ?
                (<>
                    <div className='flex flex-row items-center ml-auto space-x-4'>
                        <p>Hi {user}!</p>
                        <Button onClick={onLogout}>
                            Log out
                        </Button>
                    </div>
                </> )
                : (<>
                    <Link to='/register'>
                        <Button>
                            Register
                        </Button>
                    </Link>
                    <Link to='/login'>
                        <Button>
                            Sign in
                        </Button>
                    </Link>
                </>)}
        </div>
    )
}