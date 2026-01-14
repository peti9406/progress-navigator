import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { X } from 'lucide-react';
import InputField from "../form/InputField.jsx";

export default function SortableStep({ step, index, onChange, onRemove, canRemove }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: step.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex flex-row space-x-3 min-w-md items-center"
        >
            <InputField
                id={`step_${index + 1}`}
                label={`Step ${index + 1}:`}
                type="text"
                size="small"
                value={step.value}
                onChange={(e) => onChange(index, e.target.value)}
                labelProps={{ ...attributes, ...listeners, className: 'cursor-grab'}}
            />

            {canRemove && (
                <X
                    className="text-[var(--destructive)] cursor-pointer mt-2"
                    onClick={() => onRemove(index)}
                />
            )}
        </div>
    );
}
