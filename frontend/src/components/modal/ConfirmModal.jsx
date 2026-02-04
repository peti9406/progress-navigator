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
import Button from "../ui/Button.tsx";
import {useState} from "react";
import ErrorComponent from "../ErrorComponent.tsx";
import loadingGif from "../../../public/loading.gif"
import LoadingComponent from "../LoadingComponent.js";

export default function ConfirmModal({trigger, title, description, confirmText, onConfirm, confirmButton = 'bg-[var(--destructive)] text-[var(--text-soft)] hover:bg-[var(--destructive)]/70'}) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleConfirm() {
        setLoading(true);
        setError(null);
        try {
            await onConfirm();
            setOpen(false);
        } catch (err) {
            setError(err.response?.data?.errors || err.message || 'Something went wrong.');
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
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>

                {error && (
                    <ErrorComponent message={error} />
                )}

                <DialogFooter>
                    <DialogClose asChild>
                        <Button disabled={loading} className='bg-[var(--primary)] text-[var(--text-soft)] hover:bg-[var(--primary)]/70'>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button onClick={handleConfirm} disabled={loading} className={confirmButton}>
                        {loading &&  <LoadingComponent size="sm" />}
                        {confirmText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}