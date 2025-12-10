import './App.css'
import Navbar from "./components/NavBar.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import CreateGoal from "./pages/CreateGoal.jsx";
import api from "./api/axios.js";
import useAuth from "./hooks/useAuth.js";

function App() {
    const {user, setUser} = useAuth();

    async function handleLogout(event) {
        event.preventDefault();

        await api.get('sanctum/csrf-cookie');
        await api.post("/api/logout");
        setUser(null);
    }

    return (<BrowserRouter>
            <Navbar user={user} onLogout={handleLogout}/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/verify-email" element={<VerifyEmail/>}/>

                <Route path="/create" element={<CreateGoal/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
