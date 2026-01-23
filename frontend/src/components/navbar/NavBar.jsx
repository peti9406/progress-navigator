import {Link, useNavigate} from 'react-router-dom'
import Button from "../ui/Button.jsx";
import useAuth from "../../hooks/useAuth.js";
import ThemeToggle from "./ThemeToggle.jsx";
import {useState} from "react";
import Logo from "./Logo.jsx";
import MobileTools from "./MobileTools.jsx";

export default function Navbar({onLogout}) {
    const {user} = useAuth();
    const [open, setOpen] = useState(false);

    function handleLogout(event) {
        onLogout(event);
        setOpen(false);
    }

    return (
        <header className='bg-[var(--surface-muted)]/70 rounded-b-sm w-full overflow-x-hidden'>
            <div className='flex items-center justify-between md:grid md:grid-cols-3 px-4'>

                <Logo/>

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
                            <Button onClick={onLogout}
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

                <MobileTools onOpen={() => setOpen(!open)}/>
            </div>

            {open && (
                <div className="mt-3 flex flex-col gap-2 w-full md:hidden">
                    {user ? (
                        <>
                            <p className="font-bold">Hi {user.name}!</p>
                            <Link to="/">
                                <Button className="w-full bg-[var(--primary)] text-[var(--text-soft)]" onClick={() => setOpen(false)}>
                                    Home
                                </Button>
                            </Link>
                            {user?.isAdmin && (
                                <Link to="/users">
                                    <Button className="w-full bg-[var(--primary)] text-[var(--text-soft)]" onClick={() => setOpen(false)}>
                                        Users
                                    </Button>
                                </Link>
                            )}
                            <Button
                                onClick={handleLogout}
                                className="w-full bg-[var(--primary)] text-[var(--text-soft)]"
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link to="/register">
                                <Button className="w-full  bg-[var(--primary)] text-[var(--text-soft)]" onClick={() => setOpen(false)}>
                                    Register
                                </Button>
                            </Link>
                            <Link to="/login">
                                <Button className="w-full  bg-[var(--primary)] text-[var(--text-soft)]" onClick={() => setOpen(false)}>
                                    Sign in
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            )}
        </header>
    )
}