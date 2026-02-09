import {createContext} from "react";
import {Theme} from "../types/Theme";

interface ThemeContext {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext =  createContext<ThemeContext | null>(null);

export default ThemeContext;