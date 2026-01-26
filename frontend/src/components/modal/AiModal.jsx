import {useState} from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "../ui/dialog.jsx";
import Button from "../ui/Button.jsx";
import Assist from "../ai/Assist.jsx";
import NewGoal from "../ai/NewGoal.jsx";

export default function AiModal() {
    const [open, setOpen] = useState(false);
    const [view, setView] = useState('menu')

    const titleMap = {
        menu: 'Choose an option',
        assist: 'Stuck on a goal',
        assisted: 'Stuck on a goal',
        new: 'Set a new goal',
        generated: 'Set a new goal'
    };

    const descriptionMap = {
        menu: 'Ask the AI for help with an existing goal or create a new one.',
        assist: 'Which goal are you stuck on? Describe what is blocking your progress on this goal.',
        assisted: 'Please note that the AI may occasionally provide inaccurate or incomplete information. Always verify the advice and suggestions before acting on them.',
        new: 'Describe the goal you want to achieve. Minimum 6 and maximum 50 characters.',
        generated: 'Please note that the AI may occasionally provide inaccurate or incomplete information. Always verify the advice and suggestions before acting on them.',
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className='bg-[var(--primary)] text-[var(--text-soft)] hover:bg-[var(--primary)]/70'
                        onClick={() => {
                            setOpen(true)
                        }}>
                    <i className="fa-solid fa-robot"></i>
                    <span className='hidden md:inline-block ml-2'>Ask AI</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] md:min-w-fit max-h-[100vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className='text-3xl text-center'>{titleMap[view]}</DialogTitle>
                    <DialogDescription className='text-center my-4'>{descriptionMap[view]}</DialogDescription>
                </DialogHeader>

                {(view === 'assist' || view === 'assisted') && <Assist onSubmit={() => setView('assisted')}/>}

                {(view === 'new' || view === 'generated') && (<NewGoal onSubmit={() => setView('generated')} onOpen={setOpen} />)}

                <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-2">
                    <DialogClose asChild>
                        <Button onClick={() => setView('menu')}
                                className='w-1/2 md:w-1/3 bg-[var(--destructive)] text-[var(--text-soft)] hover:bg-[var(--destructive)]/70'>
                            Close
                        </Button>
                    </DialogClose>

                    <Button onClick={() => setView('assist')}
                            className={`w-1/2 md:w-1/3 bg-[var(--primary)] text-[var(--text-soft)] hover:bg-[var(--primary)]/70 ${view === 'menu' ? '' : 'hidden'}`}>
                        Assist goal
                    </Button>

                    <Button onClick={() => setView('new')}
                            className={`w-1/2 md:w-1/3 bg-[var(--complete)] text-[var(--text-soft)] hover:bg-[var(--complete)]/70 ${view === 'menu' ? '' : 'hidden'}`}>
                        Set new goal
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}