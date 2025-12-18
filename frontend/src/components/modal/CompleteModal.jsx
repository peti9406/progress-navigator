import {useContext} from "react";
import {GoalContext} from "../../contexts/GoalContext.js";
import Button from "../Button.jsx";
import ConfirmModal from "./ConfirmModal.jsx";

export default function CompleteModal({goal, id}) {
    const {completeGoal} = useContext(GoalContext);

    async function handleComplete() {
        try {
            await completeGoal(id);
        } catch (error) {
            console.error(error);
        }
    }

    return <ConfirmModal
        trigger={<Button text='Complete'/>}
        title={`Complete goal: ${goal}`}
        description='Are you sure you want to complete this goal?'
        confirmText='Complete'
        onConfirm={handleComplete}
    />

}