import {useContext} from "react";
import {GoalContext} from "../../contexts/GoalContext.js";
import ConfirmModal from "../../components/modal/ConfirmModal.jsx";

export default function DeleteModal({goal, id}) {
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