import {useContext} from "react";
import {GoalContext} from "../../contexts/GoalContext.js";
import ConfirmModal from "../../components/modal/ConfirmModal.jsx";

export default function DeleteModal({goal, id}) {
    const {deleteGoal} = useContext(GoalContext);

    async function handleDelete() {
        try {
            await deleteGoal(id);
        } catch (error) {
            console.log(error);
        }
    }

    return <ConfirmModal
        trigger={<i className="fa-solid fa-trash cursor-pointer"></i>}
        title={`Delete goal: ${goal}`}
        description='Are you sure you want to delete this goal?'
        confirmText='Delete'
        onConfirm={handleDelete}
    />
}