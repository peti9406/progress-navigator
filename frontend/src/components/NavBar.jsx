import {Link} from 'react-router-dom'
import Button from "./ui/Button.jsx";
import useAuth from "../hooks/useAuth.js";
import icon from "../../public/icon.png"

export default function Navbar({onLogout}) {
    const {user} = useAuth();

    return (<div className='flex flex-row items-center justify-between w-full min-w-max bg-b3d9ff'>
            <div className='flex flex-row items-center'>
                <Link to='/'>
                    <img src={icon} alt='logo' className='w-15'/>
                </Link>
                <h1 className='text-3xl font-bold text-left'>Progress Navigator</h1>
            </div>

            {Boolean(user?.isAdmin) &&
                <div>
                    <Link to='/admin'>
                        <Button className='bg-blue-800 text-white hover:bg-blue-800/70'>
                            Users
                        </Button>
                    </Link>
                </div>
            }

            {user ?
                (<div className='flex flex-row items-center space-x-4'>
                    <p className='font-bold'>Hi {user.name}!</p>
                    <Button onClick={onLogout} className='bg-blue-800 text-white hover:bg-blue-800/70'>
                        <i className="fa-solid fa-right-from-bracket"></i>
                    </Button>
                </div>)
                : (<div>
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
                </div>)}
        </div>
    )
}