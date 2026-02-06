import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import CustomButton from "../ui/CustomButton";
import {useState} from "react";
import NewGoalForm from "../goal/NewGoalForm";

export default function NewGoalModal() {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {<CustomButton className='bg-[var(--primary)] text-[var(--text-soft)] hover:bg-[var(--primary)]/70'>
                    <i className="fa-solid fa-plus mr-1"></i>
                    Set new goal
                </CustomButton>}
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px] md:min-w-fit">
                <DialogHeader className={undefined}>
                    <DialogTitle className='text-3xl text-center'>Set New Goal</DialogTitle>
                    <DialogDescription className='text-center my-4'>
                        Set up a new goal!<br/>
                        Make sure the deadline is at least tomorrow.<br/>
                        You can add up to 12 steps to reach it.<br/>
                    </DialogDescription>
                </DialogHeader>

                <NewGoalForm onSet={() => setOpen(false)}>
                    <DialogClose asChild>
                        <CustomButton
                            className='mt-4 bg-[var(--destructive)] text-[var(--text-soft)] hover:bg-[var(--destructive)]/70'>
                            Cancel
                        </CustomButton>
                    </DialogClose>
                </NewGoalForm>
            </DialogContent>
        </Dialog>
    )

}