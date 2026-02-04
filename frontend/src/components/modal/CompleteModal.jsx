import {useContext} from "react";
import {GoalContext} from "../../contexts/GoalContext.js";
import Button from "../ui/Button.tsx";
import ConfirmModal from "./ConfirmModal.jsx";

export default function CompleteModal({goal, id}) {
    const {completeGoal} = useContext(GoalContext);

    async function handleComplete() {
        await completeGoal(id);
    }

    return <ConfirmModal
        trigger={<Button className='bg-[var(--primary)] text-[var(--text-soft)] hover:bg-[var(--primary)]/70'>Complete</Button>}
        title={`Complete goal: ${goal}`}
        description='Are you sure you want to complete this goal?'
        confirmText='Complete'
        onConfirm={handleComplete}
        confirmButton='bg-[var(--complete)] text-[var(--text-soft)] hover:bg-[var(--complete)]/70'
    />

}