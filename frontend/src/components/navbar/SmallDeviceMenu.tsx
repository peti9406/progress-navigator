import {Link} from "react-router-dom";
import Button from "../ui/Button";
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
                    <Button className="w-full bg-[var(--primary)] text-[var(--text-soft)]" onClick={onNavigate}>
                        Home
                    </Button>
                </Link>
                {user?.isAdmin && (
                    <Link to="/users">
                        <Button className="w-full bg-[var(--primary)] text-[var(--text-soft)]" onClick={onNavigate}>
                            Users
                        </Button>
                    </Link>
                )}
                <Button
                    onClick={logout}
                    className="w-full bg-[var(--primary)] text-[var(--text-soft)]"
                >
                    Logout
                </Button>
            </>
        ) : (
            <>
                <Link to="/register">
                    <Button className="w-full  bg-[var(--primary)] text-[var(--text-soft)]" onClick={onNavigate}>
                        Register
                    </Button>
                </Link>
                <Link to="/login">
                    <Button className="w-full  bg-[var(--primary)] text-[var(--text-soft)]" onClick={onNavigate}>
                        Sign in
                    </Button>
                </Link>
            </>
        )}
    </div>)
}