import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog.jsx";
import {closestCenter, DndContext} from '@dnd-kit/core';
import {arrayMove, SortableContext, verticalListSortingStrategy,} from '@dnd-kit/sortable';
import Button from "../ui/Button.jsx";
import {useContext, useState} from "react";
import ErrorComponent from "../ErrorComponent.jsx";
import {GoalContext} from "../../contexts/GoalContext.js";
import InputField from "../form/InputField.jsx";
import loadingGif from "../../assets/loading.gif";
import {nanoid} from 'nanoid';
import SortableStep from "../goal/SortableStep.jsx";

export default function NewGoalModal() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [goal, setGoal] = useState('');
    const [deadline, setDeadline] = useState('');
    const [steps, setSteps] = useState([{id: nanoid(), value: ''}]);
    const {addGoal} = useContext(GoalContext);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];

    async function handleSubmit(event) {
        event.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await addGoal({goal, deadline, steps: steps.map(s => s.value)});
            setOpen(false);
            setGoal('');
            setDeadline('');
            setSteps([{id: nanoid(), value: ''}]);
        } catch (error) {
            setError(error.response?.data?.errors || error.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    function handleStepChange(index, value) {
        setSteps(prev => {
            const updated = [...prev];
            updated[index] = {...updated[index], value};
            return updated;
        });
    }

    function addStep() {
        if (steps.length < 12) {
            setSteps(prev => [...prev, {id: nanoid(), value: ''}]);
        }
    }

    function removeStep(index) {
        setSteps(prev => prev.filter((_, i) => i !== index));
    }

    function handleDragEnd(event) {
        const {active, over} = event;

        if (!over || active.id === over.id) return;

        setSteps(items => {
            const oldIndex = items.findIndex(i => i.id === active.id);
            const newIndex = items.findIndex(i => i.id === over.id);
            return arrayMove(items, oldIndex, newIndex);
        });
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {<Button className='bg-[var(--primary)] text-[var(--text-soft)] hover:bg-[var(--primary)]/70'>
                    <i className="fa-solid fa-plus mr-1"></i>
                    Set new goal
                </Button>}
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
                    {Object.values(error).map((err, index) => <ErrorComponent key={index} message={err}/>)}
                </div>}

                <form onSubmit={handleSubmit} className="flex flex-col items-center my-4">

                    <InputField id='goal' label="Goal:" placeholder="Learn..." type="text" value={goal}
                                onChange={(event) => setGoal(event.target.value)}/>

                    <InputField id="deadline" label="Deadline:" type="date" min={minDate} value={deadline}
                                onChange={(event) => setDeadline(event.target.value)}/>

                    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={steps.map(s => s.id)} strategy={verticalListSortingStrategy}>
                            <div className="my-2 max-w-min space-y-1">
                                {steps.map((step, index) => (
                                    <SortableStep
                                        key={step.id}
                                        step={step}
                                        index={index}
                                        onChange={handleStepChange}
                                        onRemove={removeStep}
                                        canRemove={steps.length > 1}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>


                    {steps.length < 12 &&
                        <Button onClick={addStep}
                                className='mt-4 bg-[var(--primary)] text-[var(--text-soft)] hover:bg-[var(--primary)]/70'>
                            Add Step
                        </Button>
                    }

                    <div className="flex justify-between w-full mt-4">
                        <DialogClose asChild>
                            <Button disabled={loading}
                                    className='bg-[var(--destructive)] text-[var(--text-soft)] hover:bg-[var(--destructive)]/70'>
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button type="submit" disabled={loading}
                                className='bg-[var(--complete)] text-[var(--text-soft)] hover:bg-[var(--complete)]/70'>
                            {loading && <img src={loadingGif} alt='loading' className='inline w-8 h-8 mr-1'/>}
                            Set goal
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )

}