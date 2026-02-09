import {createContext} from "react";
import {GoalType} from "../types/GoalType";
import {SortBy} from "../types/SortBy";
import {SortOrder} from "../types/SortOrder";
import {Filter} from "../types/Filter";
import {AddGoalRequest} from "../types/AddGoalRequest";

interface GoalContext {
    goals: GoalType[];
    loading: boolean;
    error: string[];
    setLoading: (loading: boolean) => void;
    setError: (error: string[]) => void;
    addGoal: (goal: AddGoalRequest) => void;
    deleteGoal: (id: number) => void;
    toggleStep: (goalId: number, stepId: number) => void;
    completeGoal: (goalId: number) => void;
    filter: Filter
    filterGoals: (filter: Filter) => void;
    sorted: SortOrder
    sortBy: SortBy
    sortGoals: (sort: SortBy) => void;
}

export const GoalContext = createContext<GoalContext | null>(null);