import ThemeToggle from "./ThemeToggle.js";
import {Menu} from "lucide-react";

interface MobileToolsProps {
    onOpen: () => void;
}

export default function SmallDeviceTools({onOpen} : MobileToolsProps) {
    return (
        <div className='md:hidden flex justify-end items-center pr-2 gap-8'>
            <ThemeToggle />
            <button className='md:hidden' onClick={onOpen}>
                <Menu />
            </button>
        </div>
    )
}