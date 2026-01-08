import ThemeContext from "./ThemeContext.js";
import {useEffect, useState} from "react";

export default function ThemeProvider({children}) {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || 'light');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        localStorage.setItem("theme", theme);
    }, [theme]);

    function toggleTheme() {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }

    return (<ThemeContext.Provider value={{theme, toggleTheme}}>
        {children}
    </ThemeContext.Provider>);
}