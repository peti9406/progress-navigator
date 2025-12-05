import './App.css'
import Navbar from "./components/NavBar.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import {useEffect, useState} from "react";
import CreateGoal from "./pages/CreateGoal.jsx";

function App() {
    const [name, setName] = useState('Guest');

    useEffect(() => {
        function getName() {
            setName(localStorage.getItem('name') || 'Guest');
        }
        getName();
    }, [])

    return (<BrowserRouter>
            <Navbar name={name} setName={setName} />
            <div>
                <Routes>
                    <Route path="/" element={<Home /> }/>
                    <Route path="/login" element={<Login setName={setName}/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/verify-email" element={<VerifyEmail />} />

                    <Route path="/create" element={<CreateGoal />}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
