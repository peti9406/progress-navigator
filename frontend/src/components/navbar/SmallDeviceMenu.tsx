import {Link} from "react-router-dom";
import CustomButton from "../ui/CustomButton";
import React, {useContext} from "react";
import AuthContext from "../../contexts/AuthContext";

interface MobileMenuProps {
    onNavigate: () => void;
}

export default function SmallDeviceMenu({ onNavigate }: MobileMenuProps) {
    const {user, handleLogout} = useContext(AuthContext);

    function logout(event: React.MouseEvent<HTMLButtonElement>) {
        handleLogout(event);
        onNavigate();
    }

    return (<div className="mt-3 flex flex-col gap-2 w-full md:hidden">
        {user ? (
            <>
                <p className="font-bold">Hi {user.name}!</p>
                <Link to="/">
                    <CustomButton className="w-full bg-[var(--primary)] text-[var(--text-soft)]" onClick={onNavigate}>
                        Home
                    </CustomButton>
                </Link>
                {user?.isAdmin && (
                    <Link to="/users">
                        <CustomButton className="w-full bg-[var(--primary)] text-[var(--text-soft)]" onClick={onNavigate}>
                            Users
                        </CustomButton>
                    </Link>
                )}
                <CustomButton
                    onClick={logout}
                    className="w-full bg-[var(--primary)] text-[var(--text-soft)]"
                >
                    Logout
                </CustomButton>
            </>
        ) : (
            <>
                <Link to="/register">
                    <CustomButton className="w-full  bg-[var(--primary)] text-[var(--text-soft)]" onClick={onNavigate}>
                        Register
                    </CustomButton>
                </Link>
                <Link to="/login">
                    <CustomButton className="w-full  bg-[var(--primary)] text-[var(--text-soft)]" onClick={onNavigate}>
                        Sign in
                    </CustomButton>
                </Link>
            </>
        )}
    </div>)
}