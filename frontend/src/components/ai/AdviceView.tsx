import Button from "../ui/Button";
import {AdviceType} from "../../types/AdviceType";

interface AdviceViewProps {
    advice: AdviceType;
    loading: boolean;
    onBack: () => void;
}

export default function AdviceView({advice, loading, onBack} : AdviceViewProps) {

    return (<>
            <div className="max-h-[60vh] overflow-y-auto p-4 rounded-md bg-[var(--surface-soft)] shadow-md">
                {advice.reflection && (
                    <p className='mb-2 italic'>{advice.reflection}</p>
                )}

                {advice.steps.length > 0 && (
                    <ul className='space-y-4'>
                        {advice.steps.map((step, index) => (
                            <li key={index}>{`${index + 1}. ${step}`}</li>
                        ))}
                    </ul>
                )}
            </div>
            <div className='flex justify-center'>
                <Button disabled={loading} onClick={onBack}
                        className='mt-4 w-1/2 md:w-1/3 bg-[var(--primary)] text-[var(--text-soft)] hover:bg-[var(--primary)]/70'>
                    Back
                </Button>
            </div>
        </>
    )
}