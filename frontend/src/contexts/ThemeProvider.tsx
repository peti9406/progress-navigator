import ThemeContext from "./ThemeContext";
import {ReactNode, useEffect, useState} from "react";
import {Theme} from "../types/Theme";

interface ThemeProviderProps {
    children: ReactNode;
}

export default function ThemeProvider({children}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem("theme");
        return (saved === "dark" || saved === "light") ? saved : 'light'
    });

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        localStorage.setItem("theme", theme);
    }, [theme]);

    function toggleTheme() {
        document.body.classList.add('transition-enabled');
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }

    return (<ThemeContext.Provider value={{theme, toggleTheme}}>
        {children}
    </ThemeContext.Provider>);
}