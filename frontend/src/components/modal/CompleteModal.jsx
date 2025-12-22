import {useContext} from "react";
import {GoalContext} from "../../contexts/GoalContext.js";
import Button from "../ui/Button.jsx";
import ConfirmModal from "./ConfirmModal.jsx";

export default function CompleteModal({goal, id}) {
    const {completeGoal} = useContext(GoalContext);

    async function handleComplete() {
        await completeGoal(id);
    }

    return <ConfirmModal
        trigger={<Button className='bg-blue-800 text-white hover:bg-blue-800/70'>Complete</Button>}
        title={`Complete goal: ${goal}`}
        description='Are you sure you want to complete this goal?'
        confirmText='Complete'
        onConfirm={handleComplete}
        confirmButton='bg-green-600 text-white hover:bg-green-600/70'
    />

}