import {useContext} from "react";
import AuthContext from "../../contexts/AuthContext";
import {Link} from "react-router-dom";
import Button from "../ui/Button";
import ThemeToggle from "./ThemeToggle";

export default function LargeDeviceMenu() {
    const {user, handleLogout} = useContext(AuthContext);

    return (
        <>
            <div className='hidden md:flex justify-center'>
                {Boolean(user?.isAdmin) &&
                    <Link to='/users'>
                        <Button
                            className='bg-[var(--primary)] hover:bg-[var(--primary)]/70 text-[var(--text-soft)]'>
                            Users
                        </Button>
                    </Link>
                }
            </div>

            <div className='hidden md:flex justify-end items-center gap-4 min-w-0'>
                <ThemeToggle/>
                {user ?
                    (<>
                        <p className='font-bold'>Hi {user.name}!</p>
                        <Button onClick={handleLogout}
                                className='bg-[var(--primary)] hover:bg-[var(--primary)]/70  text-[var(--text-soft)]'>
                            <i className="fa-solid fa-right-from-bracket"></i>
                        </Button>
                    </>)
                    : (<>
                        <Link to='/register'>
                            <Button
                                className='bg-[var(--primary)] hover:bg-[var(--primary)]/70  text-[var(--text-soft)]'>
                                Register
                            </Button>
                        </Link>
                        <Link to='/login'>
                            <Button
                                className='bg-[var(--primary)] hover:bg-[var(--primary)]/70  text-[var(--text-soft)]'>
                                Sign in
                            </Button>
                        </Link>
                    </>)}
            </div>
        </>
    )
}