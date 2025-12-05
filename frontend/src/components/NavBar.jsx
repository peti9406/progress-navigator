import {Link, useNavigate} from 'react-router-dom'
import Button from "./Button.jsx";
import api from "../api/axios.js";

export default function Navbar({name, setName}) {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('name');

    async function handleLogout(event) {
        event.preventDefault();

        await api.get('sanctum/csrf-cookie');
        await api.post("/api/logout");
        localStorage.clear();
        setName('Guest');
        navigate('/');
    }

    return (<div className='flex flex-row justify-center items-center'>
            <p>Logged in as: {name}!</p>
            <Link to='/'>
                <Button text='Home' />
            </Link>
            {isLoggedIn ?
                (<>
                    <Link to='/create'>
                        <Button text='Set new goal'/>
                    </Link>
                    <Button onclick={handleLogout} text='Log out'/>
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