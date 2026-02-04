import InputField from "../form/InputField.jsx";
import {closestCenter, DndContext} from "@dnd-kit/core";
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import SortableStep from "./SortableStep.jsx";
import Button from "../ui/Button.tsx";
import {useContext, useState} from "react";
import {nanoid} from "nanoid";
import {GoalContext} from "../../contexts/GoalContext.js";
import loadingGif from "../../../public/loading.gif"
import ErrorComponent from "../ErrorComponent.tsx";
import LoadingComponent from "../LoadingComponent.js";

export default function NewGoalForm({ onSet, children, aiGoal = '', aiSteps = [{id: nanoid(), value: ''}]}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [goal, setGoal] = useState(aiGoal);
    const [deadline, setDeadline] = useState('');
    const [steps, setSteps] = useState(aiSteps);
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
            onSet && onSet();
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
        <form onSubmit={handleSubmit} className="flex flex-col items-center mt-4">

            <InputField id='goal' label="Goal:" placeholder="Learn..." type="text" value={goal}
                        onChange={(event) => setGoal(event.target.value)}/>

            <InputField id="deadline" label="Deadline:" type="date" min={minDate} value={deadline}
                        onChange={(event) => setDeadline(event.target.value)}/>

            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={steps.map(s => s.id)} strategy={verticalListSortingStrategy}>
                    <div className="my-2 space-y-1 max-h-[30vh] md:max-h-[60vh] overflow-y-auto">
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
                        className='mt-4 w-1/2 md:w-1/3 bg-[var(--primary)] text-[var(--text-soft)] hover:bg-[var(--primary)]/70'>
                    Add Step
                </Button>
            }

            {error && <div>
                {Object.values(error).map((err, index) => <ErrorComponent key={index} message={err}/>)}
            </div>}

            <div className="flex flex-col-reverse justify-between w-1/2 md:w-1/3 mt-4">
                {children}

                <Button type="submit" disabled={loading}
                        className='bg-[var(--complete)] text-[var(--text-soft)] hover:bg-[var(--complete)]/70'>
                    {loading && <LoadingComponent size="sm" />}
                    Set goal
                </Button>
            </div>
        </form>)
}