import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App'
import AuthProvider from "./contexts/AuthProvider";
import {GoalProvider} from "./contexts/GoalProvider";
import ThemeProvider from "./contexts/ThemeProvider";

const root = document.getElementById('root');

if (!root) {
    throw new Error('Root element not found!');
}

createRoot(root).render(
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
