import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {X} from 'lucide-react';
import InputField from "../form/InputField.js";
import {ChangeEvent} from "react";

interface SortableStepProps {
    step: SortableStep;
    index: number;
    onChange: (index: number, value: string) => void;
    onRemove: (index: number) => void;
    canRemove: boolean;
}

export default function SortableStep({step, index, onChange, onRemove, canRemove}: SortableStepProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: step.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex flex-row space-x-3 items-center"
        >
            <InputField
                id={`step_${index + 1}`}
                label={`Step ${index + 1}:`}
                type="text"
                size="small"
                value={step.value}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(index, e.target.value)}
                labelProps={{...attributes, ...listeners, className: 'cursor-grab'}}
            />

            {canRemove && (
                <X
                    className="text-[var(--destructive)] cursor-pointer"
                    onClick={() => onRemove(index)}
                />
            )}
        </div>
    );
}
