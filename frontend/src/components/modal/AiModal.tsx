import {useState} from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "../ui/dialog";
import CustomButton from "../ui/CustomButton";
import Assist from "../ai/Assist";
import NewGoal from "../ai/NewGoal.js";

export default function AiModal() {
    const [open, setOpen] = useState<boolean>(false);
    const [view, setView] = useState<string>('menu')

    const titleMap: AiModalTextMap = {
        menu: 'Choose an option',
        assist: 'Stuck on a goal',
        assisted: 'Stuck on a goal',
        new: 'Set a new goal',
        generated: 'Set a new goal'
    };

    const descriptionMap: AiModalTextMap = {
        menu: 'Ask the AI for help with an existing goal or create a new one.',
        assist: 'Which goal are you stuck on? Describe what is blocking your progress on this goal.',
        assisted: 'Please note that the AI may occasionally provide inaccurate or incomplete information. Always verify the advice and suggestions before acting on them.',
        new: 'Describe the goal you want to achieve. Minimum 6 and maximum 50 characters.',
        generated: 'Please note that the AI may occasionally provide inaccurate or incomplete information. Always verify the advice and suggestions before acting on them.',
    }

    function handleOpen(isOpen: boolean) {
        setView('menu');
        setOpen(isOpen);
    }

    return (
        <Dialog open={open} onOpenChange={handleOpen} >
            <DialogTrigger asChild>
                <CustomButton className='bg-[var(--primary)] text-[var(--text-soft)] hover:bg-[var(--primary)]/70'
                              onClick={() => {
                            setOpen(true)
                        }}>
                    <i className="fa-solid fa-robot"></i>
                    <span className='hidden md:inline-block ml-2'>Ask AI</span>
                </CustomButton>
            </DialogTrigger>
            <DialogContent className="md:min-w-fit max-h-[100vh] overflow-y-auto">
                <DialogHeader className={undefined}>
                    <DialogTitle className='text-3xl text-center'>{titleMap[view]}</DialogTitle>
                    <DialogDescription className='text-center my-4'>{descriptionMap[view]}</DialogDescription>
                </DialogHeader>

                {(view === 'assist' || view === 'assisted') && <Assist onViewChange={setView} />}

                {(view === 'new' || view === 'generated') && (<NewGoal onViewChange={setView} onSet={() => setOpen(false)}/>)}

                <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-2">
                    <DialogClose asChild>
                        <CustomButton
                                className='w-1/2 md:w-1/3 bg-[var(--destructive)] text-[var(--text-soft)] hover:bg-[var(--destructive)]/70'>
                            Close
                        </CustomButton>
                    </DialogClose>

                    <CustomButton onClick={() => setView('assist')}
                                  className={`w-1/2 md:w-1/3 bg-[var(--primary)] text-[var(--text-soft)] hover:bg-[var(--primary)]/70 ${view === 'menu' ? '' : 'hidden'}`}>
                        Assist goal
                    </CustomButton>

                    <CustomButton onClick={() => setView('new')}
                                  className={`w-1/2 md:w-1/3 bg-[var(--complete)] text-[var(--text-soft)] hover:bg-[var(--complete)]/70 ${view === 'menu' ? '' : 'hidden'}`}>
                        Set new goal
                    </CustomButton>
                </div>
            </DialogContent>
        </Dialog>
    )
}