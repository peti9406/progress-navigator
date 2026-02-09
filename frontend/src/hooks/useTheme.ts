import {useContext} from "react";
import ThemeContext from "../contexts/ThemeContext";

export default function useTheme() {
    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        throw new Error('ThemeContext must be used within ThemeProvider');
    }
    return themeContext;
}