import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "../ui/dialog.jsx";
import ErrorComponent from "../ErrorComponent.jsx";
import Button from "../ui/Button.jsx";
import api from "../../api/axios.js";
import {useState} from "react";
import LoadingComponent from "../LoadingComponent.jsx";

export default function AiChatModal({goalId}) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [advice, setAdvice] = useState([]);

    async function getHelp(id) {
        setLoading(true);
        setError(null);
        try {
            const {data} = await api.post(`/api/goals/${id}/help`);
            setAdvice(data.split('|n'));
        } catch (error) {
            console.error(error);
            setError('AI service is currently unavailable, try again later.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => getHelp(goalId)}
                        className='bg-[var(--primary)] text-[var(--text-soft)] hover:bg-[var(--primary)]/70'>Help</Button>
            </DialogTrigger>
            <DialogContent className="p-8 w-full max-w-3xl h-[80vh] sm:h-auto overflow-y-auto rounded-md">
                <DialogHeader>
                    <DialogTitle className='text-3xl text-center'>Suggestion</DialogTitle>
                    <DialogDescription className='text-center my-4'>
                        Please note that the AI may occasionally provide inaccurate or incomplete information. Always
                        verify the advice and suggestions before acting on them.
                    </DialogDescription>
                </DialogHeader>

                {loading && <LoadingComponent/>}

                {!loading && advice && (
                    <div className="max-h-[60vh] overflow-y-auto p-4 rounded-md bg-[var(--surface-soft)]">
                        <ul className='space-y-4'>
                            {advice.map((advice, index) => (
                                    <li key={index}>{advice}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {error && (
                    <ErrorComponent message={error}/>
                )}

                <div className='flex justify-center mt-4'>
                    <DialogClose asChild>
                        <Button disabled={loading} onClick={() => setAdvice('')}
                                className='w-1/2 max-h-fit bg-[var(--primary)] text-[var(--text-soft)] hover:bg-[var(--primary)]/70'>
                            Close
                        </Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    )
}