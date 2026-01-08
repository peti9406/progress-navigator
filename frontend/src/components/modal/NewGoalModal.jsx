import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog.jsx";
import Button from "../ui/Button.jsx";
import {useContext, useState} from "react";
import ErrorComponent from "../ErrorComponent.jsx";
import {GoalContext} from "../../contexts/GoalContext.js";
import InputField from "../form/InputField.jsx";
import loadingGif from "../../assets/loading.gif";
import {X} from "lucide-react";

export default function NewGoalModal() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [goal, setGoal] = useState('');
    const [deadline, setDeadline] = useState('');
    const [steps, setSteps] = useState(['']);
    const {addGoal} = useContext(GoalContext);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];

    async function handleSubmit(event) {
        event.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await addGoal({goal, deadline, steps});
            setOpen(false);
        } catch (error) {
            setError(error.response?.data?.errors || error.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    function handleStepChange(index, value) {
        setSteps(prev => {
            const updated = [...prev];
            updated[index] = value;
            return updated;
        });
    }

    function addStep() {
        if (steps.length < 12) {
            setSteps(prev => [...prev, ""]);
        }
    }

    function removeStep(index) {
        setSteps(prev => prev.filter((_, i) => i !== index));
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {<Button className='bg-[var(--primary)] text-[var(--text-soft)] hover:bg-[var(--primary)]/70'>
                    <i className="fa-solid fa-plus mr-1">

                    </i>Set new goal</Button>}
            </DialogTrigger>
            <DialogContent className="p-10 min-w-max">
                <DialogHeader>
                    <DialogTitle className='text-3xl text-center'>Set New Goal</DialogTitle>
                    <DialogDescription className='text-center my-4'>
                        Set up a new goal!<br/>
                        Make sure the deadline is at least tomorrow.<br/>
                        You can add up to 12 steps to reach it.<br/>
                    </DialogDescription>
                </DialogHeader>

                {error && <div>
                    {Object.values(error).map((err, index) => <ErrorComponent key={index} message={err} />)}
                </div>}

                <form onSubmit={handleSubmit} className="flex flex-col items-center my-4">

                    <InputField id='goal' label="Goal:" placeholder="Learn..." type="text" value={goal}
                                onChange={(event) => setGoal(event.target.value)}/>

                    <InputField id="deadline" label="Deadline:" type="date" min={minDate} value={deadline}
                                onChange={(event) => setDeadline(event.target.value)}/>

                    <div className='my-2 max-w-min space-y-1'>
                        {steps.map((step, index) => (
                            <div key={index} className='flex flex-row space-x-3 min-w-md'>
                                <InputField id={`step_${index + 1}`} label={`Step ${index + 1}:`} type="text" size='small'
                                            value={steps[index]}
                                            onChange={(event) => handleStepChange(index, event.target.value)}/>
                                {steps.length > 1 &&
                                        <X className='text-[var(--destructive)] cursor-pointer mt-2' onClick={() => removeStep(index)}/>}
                            </div>))}
                    </div>

                    {steps.length < 12 &&
                        <Button onClick={addStep} className='bg-[var(--primary)] text-[var(--text-soft)] hover:bg-[var(--primary)]/70'>
                            Add Step
                        </Button>
                    }

                    <div className="flex justify-between w-full mt-10">
                        <DialogClose asChild>
                            <Button disabled={loading} className='bg-[var(--destructive)] text-[var(--text-soft)] hover:bg-[var(--destructive)]/70'>Cancel</Button>
                        </DialogClose>

                        <Button type="submit" disabled={loading} className='bg-[var(--complete)] text-[var(--text-soft)] hover:bg-[var(--complete)]/70'>
                            {loading && <img src={loadingGif} alt='loading' className='inline w-8 h-8 mr-1'/>}
                            Set goal
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )

}