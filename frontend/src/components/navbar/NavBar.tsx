import {useState} from "react";
import Logo from "./Logo";
import SmallDeviceTools from "./SmallDeviceTools";
import SmallDeviceMenu from "./SmallDeviceMenu";
import LargeDeviceMenu from "./LargeDeviceMenu";

export default function Navbar() {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <header className='bg-[var(--surface-muted)]/70 rounded-b-sm w-full overflow-x-hidden'>
            <div className='flex items-center justify-between md:grid md:grid-cols-3 px-4'>

                <Logo/>

                <LargeDeviceMenu />

                <SmallDeviceTools onOpen={() => setOpen(!open)}/>
            </div>

            {open && <SmallDeviceMenu onNavigate={() => setOpen(false)}/>}
        </header>
    )
}