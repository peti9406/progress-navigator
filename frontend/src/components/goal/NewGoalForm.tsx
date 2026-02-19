import InputField from "../form/InputField";
import {closestCenter, DndContext, DragEndEvent} from "@dnd-kit/core";
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import SortableStep from "./SortableStep";
import CustomButton from "../ui/CustomButton";
import React, {ReactNode, useState} from "react";
import {nanoid} from "nanoid";
import ErrorComponent from "../ErrorComponent";
import LoadingComponent from "../LoadingComponent.js";
import handleError from "../../utils/HandleError";
import useGoals from "../../hooks/useGoals";

interface NewGoalFormProps {
    onSet: () => void;
    children?: ReactNode;
    aiGoal?: string;
    aiSteps?: SortableStep[];
}

export default function NewGoalForm({
                                        onSet,
                                        children,
                                        aiGoal = '',
                                        aiSteps = [{id: nanoid(), value: ''}]
                                    }: NewGoalFormProps) {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string[]>([]);

    const [goal, setGoal] = useState<string>(aiGoal);
    const [deadline, setDeadline] = useState<string>('');
    const [steps, setSteps] = useState<SortableStep[]>(aiSteps);
    const {addGoal} = useGoals();

    const tomorrow: Date = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate: string = new Intl.DateTimeFormat('sv-SE').format(tomorrow);

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setError([]);
        setLoading(true);

        try {
            await addGoal({goal, deadline, steps: steps.map(s => s.value)});
            onSet();
            setGoal('');
            setDeadline('');
            setSteps([{id: nanoid(), value: ''}]);
        } catch (error: unknown) {
            handleError(error, setError)
        } finally {
            setLoading(false);
        }
    }

    function handleStepChange(index: number, value: string) {
        setSteps(prev => {
            const updated = [...prev];

            if (!updated[index]) {
                return updated;
            }

            updated[index] = {...updated[index], value};
            return updated;
        });
    }

    function addStep() {
        if (steps.length < 12) {
            setSteps(prev => [...prev, {id: nanoid(), value: ''}]);
        }
    }

    function removeStep(index: number) {
        setSteps(prev => prev.filter((_, i) => i !== index));
    }

    function handleDragEnd(event: DragEndEvent) {
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

            <InputField id='goal' label="GoalType:" placeholder="Learn..." type="text" value={goal} minLength={6}
                        maxLength={50}
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
                <CustomButton onClick={addStep}
                              className='my-4 w-1/2 md:w-1/3 bg-[var(--primary)] text-[var(--text-soft)] hover:bg-[var(--primary)]/70'>
                    Add Step
                </CustomButton>
            }

            {error.length > 0 && <ErrorComponent messages={error}/>}

            <div className="flex flex-col-reverse justify-between w-1/2 md:w-1/3">
                {children}

                <CustomButton type="submit" disabled={loading}
                              className='bg-[var(--complete)] text-[var(--text-soft)] hover:bg-[var(--complete)]/70'>
                    {loading && <LoadingComponent size="sm"/>}
                    Set goal
                </CustomButton>
            </div>
        </form>)
}