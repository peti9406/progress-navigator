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
import Button from "../ui/Button.jsx";
import {useState} from "react";
import ErrorComponent from "../ErrorComponent.jsx";
import loadingGif from "../../assets/loading.gif"

export default function ConfirmModal({trigger, title, description, confirmText, onConfirm}) {
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
                        <Button disabled={loading}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button onClick={handleConfirm} disabled={loading}>
                        {loading && <img src={loadingGif} alt='loading' className='inline w-8 h-8 mr-1'/>}
                        {confirmText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}