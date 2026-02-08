import {Link} from "react-router-dom";
import CustomButton from "../ui/CustomButton";
import ThemeToggle from "./ThemeToggle";
import useAuth from "../../hooks/useAuth";

export default function LargeDeviceMenu() {
    const {user, handleLogout} = useAuth();

    return (
        <>
            <div className='hidden md:flex justify-center'>
                {Boolean(user?.is_admin) &&
                    <Link to='/users'>
                        <CustomButton
                            className='bg-[var(--primary)] hover:bg-[var(--primary)]/70 text-[var(--text-soft)]'>
                            Users
                        </CustomButton>
                    </Link>
                }
            </div>

            <div className='hidden md:flex justify-end items-center gap-4 min-w-0'>
                <ThemeToggle/>
                {user ?
                    (<>
                        <p className='font-bold'>Hi {user.name}!</p>
                        <CustomButton onClick={handleLogout}
                                      className='bg-[var(--primary)] hover:bg-[var(--primary)]/70  text-[var(--text-soft)]'>
                            <i className="fa-solid fa-right-from-bracket"></i>
                        </CustomButton>
                    </>)
                    : (<>
                        <Link to='/register'>
                            <CustomButton
                                className='bg-[var(--primary)] hover:bg-[var(--primary)]/70  text-[var(--text-soft)]'>
                                Register
                            </CustomButton>
                        </Link>
                        <Link to='/login'>
                            <CustomButton
                                className='bg-[var(--primary)] hover:bg-[var(--primary)]/70  text-[var(--text-soft)]'>
                                Sign in
                            </CustomButton>
                        </Link>
                    </>)}
            </div>
        </>
    )
}