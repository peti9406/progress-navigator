import {GoalContext} from "../contexts/GoalContext";
import {useContext} from "react";

export default function useGoals() {
    const goalContext = useContext(GoalContext);

    if (!goalContext) {
        throw new Error('GoalContext should be used inside GoalProvider');
    }

    return goalContext;
}