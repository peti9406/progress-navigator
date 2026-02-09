import ToolTipCustom from "../ui/ToolTipCustom.jsx";
import {Moon, Sun} from "lucide-react";
import useTheme from "../../hooks/useTheme";

export default function ThemeToggle() {
    const {theme, toggleTheme} = useTheme();

    return <button onClick={toggleTheme}>
        {theme === 'dark'
            ? <ToolTipCustom tip='Switch to Light Mode'><Sun/></ToolTipCustom>
            : <ToolTipCustom tip='Switch to Dark Mode'><Moon/></ToolTipCustom>}
    </button>;

}