import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog.jsx";
import {useContext} from "react";
import {GoalContext} from "../contexts/GoalContext.js";
import Button from "./Button.jsx";

export default function ConfirmDelete({goal, id}) {
    const {deleteGoal} = useContext(GoalContext);

    async function handleDelete(id) {
        try {
            await deleteGoal(id);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Dialog>
                <DialogTrigger asChild>
                    <i className="fa-solid fa-trash cursor-pointer"></i>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Delete Goal: {goal}</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this goal?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button text='Cancel' />
                        </DialogClose>
                        <DialogClose asChild>
                            <Button text='Delete' onClick={() => handleDelete(id)} />
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
        </Dialog>
    )
}