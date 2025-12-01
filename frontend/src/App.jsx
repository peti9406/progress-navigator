import './App.css'
import Navbar from "./components/NavBar.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";

function App() {


    return (<BrowserRouter>
            <Navbar/>
            <div>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/verify-email" element={<VerifyEmail />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
