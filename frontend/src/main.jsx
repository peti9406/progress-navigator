import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import AuthProvider from "./contexts/AuthProvider.jsx";
import {GoalProvider} from "./contexts/GoalProvider.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <GoalProvider>
                <App/>
            </GoalProvider>
        </AuthProvider>
    </StrictMode>,
)
