import {Link} from 'react-router-dom'
import Button from "./ui/Button.jsx";
import useAuth from "../hooks/useAuth.js";
import icon from "/src/assets/icon.png"

export default function Navbar({onLogout}) {
    const {user} = useAuth();

    return (<div className='grid grid-cols-3 items-center justify-between w-full min-w-max bg-b3d9ff'>
            <div className='flex items-center'>
                <Link to='/'>
                    <img src={icon} alt='logo' className='w-15'/>
                </Link>
                <h1 className='text-3xl font-bold'>Progress Navigator</h1>
            </div>

            <div>
                {Boolean(user?.isAdmin) &&
                    <Link to='/admin'>
                        <Button className='bg-[var(--primary)] hover:bg-[var(--primary)]/70  text-[var(--text-soft)]'>
                            Users
                        </Button>
                    </Link>
                }
            </div>

            <div className='flex justify-end items-center space-x-4'>
                {user ?
                    (<>
                        <p className='font-bold'>Hi {user.name}!</p>
                        <Button onClick={onLogout} className='bg-[var(--primary)] hover:bg-[var(--primary)]/70  text-[var(--text-soft)]'>
                            <i className="fa-solid fa-right-from-bracket"></i>
                        </Button>
                    </>)
                    : (<>
                        <Link to='/register'>
                            <Button className='bg-[var(--primary)] hover:bg-[var(--primary)]/70  text-[var(--text-soft)]'>
                                Register
                            </Button>
                        </Link>
                        <Link to='/login'>
                            <Button className='bg-[var(--primary)] hover:bg-[var(--primary)]/70  text-[var(--text-soft)]'>
                                Sign in
                            </Button>
                        </Link>
                    </>)}
            </div>
        </div>
    )
}