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
import Button from "../ui/Button";
import React, {useState} from "react";
import ErrorComponent from "../ErrorComponent";
import LoadingComponent from "../LoadingComponent";
import handleError from "../../utils/HandleError";

interface ConfirmModalProps {
    trigger: React.JSX.Element;
    title: string;
    description: string;
    confirmText: string;
    onConfirm: () => void;
    confirmButtonStyle?: string;
}

export default function ConfirmModal({trigger, title, description, confirmText, onConfirm, confirmButtonStyle = 'bg-[var(--destructive)] text-[var(--text-soft)] hover:bg-[var(--destructive)]/70'} : ConfirmModalProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string[]>([]);

    async function handleConfirm() {
        setLoading(true);
        setError([]);
        try {
            onConfirm();
            setOpen(false);
        } catch (error) {
            handleError(error, setError)
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className={undefined}>
                    <DialogTitle className={undefined}>{title}</DialogTitle>
                    <DialogDescription className={undefined}>
                        {description}
                    </DialogDescription>
                </DialogHeader>

                {error && <ErrorComponent messages={error} />}

                <DialogFooter className={undefined}>
                    <DialogClose asChild>
                        <Button disabled={loading} className='bg-[var(--primary)] text-[var(--text-soft)] hover:bg-[var(--primary)]/70'>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button onClick={handleConfirm} disabled={loading} className={confirmButtonStyle}>
                        {loading &&  <LoadingComponent size="sm" />}
                        {confirmText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}