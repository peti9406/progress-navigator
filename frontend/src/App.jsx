import './App.css'
import Navbar from "./components/navbar/NavBar.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import Admin from "./pages/Admin.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {

    return (<BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/verify-email" element={<VerifyEmail/>}/>
                <Route path="/users" element={<Admin/>}/>
                <Route path="*" element={<NotFound />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
