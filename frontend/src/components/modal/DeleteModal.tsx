import {useContext} from "react";
import {GoalContext} from "../../contexts/GoalContext.js";
import ConfirmModal from "./ConfirmModal";

interface DeleteModalProps {
    goal: string;
    id: number
}

export default function DeleteModal({goal, id}: DeleteModalProps) {
    const {deleteGoal} = useContext(GoalContext);

    async function handleDelete() {
        await deleteGoal(id);
    }

    return <ConfirmModal
        trigger={<i className="fa-solid fa-trash cursor-pointer text-[var(--destructive)]"></i>}
        title={`Delete goal: ${goal}`}
        description='Are you sure you want to delete this goal?'
        confirmText='Delete'
        onConfirm={handleDelete}
    />
}