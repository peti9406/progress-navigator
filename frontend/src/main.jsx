import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import AuthProvider from "./contexts/AuthProvider.tsx";
import {GoalProvider} from "./contexts/GoalProvider.jsx";
import ThemeProvider from "./contexts/ThemeProvider.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <ThemeProvider>
                <GoalProvider>
                    <App/>
                </GoalProvider>
            </ThemeProvider>
        </AuthProvider>
    </StrictMode>,
)
