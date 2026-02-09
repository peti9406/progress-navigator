import './App.css'
import Navbar from "./components/navbar/NavBar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import VerifyEmail from "./pages/VerifyEmail";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

function App() {

    return (<BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/verify-email" element={<VerifyEmail/>}/>
                <Route path="/users" element={<Admin/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
