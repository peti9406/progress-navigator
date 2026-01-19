import ThemeToggle from "./ThemeToggle.jsx";
import {Menu} from "lucide-react";

export default function MobileTools({onOpen}){
    return (
        <div className='md:hidden flex justify-end items-center pr-2 gap-8'>
            <ThemeToggle />
            <button className='md:hidden' onClick={onOpen}>
                <Menu />
            </button>
        </div>
    )
}