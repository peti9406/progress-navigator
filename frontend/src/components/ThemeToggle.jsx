import ToolTipCustom from "./ui/ToolTipCustom.jsx";
import {Moon, Sun} from "lucide-react";
import {useContext} from "react";
import ThemeContext from "../contexts/ThemeContext.js";

export default function ThemeToggle() {
    const {theme, toggleTheme} = useContext(ThemeContext);

    return <button onClick={toggleTheme}>
        {theme === 'dark'
            ? <ToolTipCustom tip='Switch to Light Mode'><Sun/></ToolTipCustom>
            : <ToolTipCustom tip='Switch to Dark Mode'><Moon/></ToolTipCustom>}
    </button>;

}