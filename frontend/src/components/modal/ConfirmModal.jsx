import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog.jsx";
import Button from "../Button.jsx";

export default function ConfirmModal({trigger, title, description, confirmText, onConfirm}) {

    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button text='Cancel'/>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button text={confirmText} onClick={onConfirm}/>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}