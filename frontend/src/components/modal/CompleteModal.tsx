import CustomButton from "../ui/CustomButton";
import ConfirmModal from "./ConfirmModal";
import useGoals from "../../hooks/useGoals";

interface CompleteModalProps {
    goal: string;
    id: number;
}

export default function CompleteModal({goal, id}: CompleteModalProps) {
    const {completeGoal} = useGoals();

    async function handleComplete() {
        completeGoal(id);
    }

    return <ConfirmModal
        trigger={<CustomButton
            className='bg-[var(--primary)] text-[var(--text-soft)] hover:bg-[var(--primary)]/70'>Complete</CustomButton>}
        title={`Complete goal: ${goal}`}
        description='Are you sure you want to complete this goal?'
        confirmText='Complete'
        onConfirm={handleComplete}
        confirmButtonStyle='bg-[var(--complete)] text-[var(--text-soft)] hover:bg-[var(--complete)]/70'
    />

}