import React, {useContext, useEffect, useState} from "react";
import api from "../api/axios";
import {GoalContext} from "./GoalContext";
import useAuth from "../hooks/useAuth";
import {GoalResponseSchema, GoalType} from "../types/GoalType";
import handleError from "../utils/HandleError";
import {SortOrder} from "../types/SortOrder";
import {Filter} from "../types/Filter";
import {SortBy} from "../types/SortBy";
import {AddGoalRequest} from "../types/AddGoalRequest";

interface GoalProviderProps {
    children: React.ReactNode;
}

export function GoalProvider({children}: GoalProviderProps) {
    const [goals, setGoals] = useState<GoalType[]>([]);
    const [error, setError] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [filter, setFilter] = useState<Filter>("Not Completed");
    const [sorted, setSorted] = useState<SortOrder>("Ascending");
    const [sortBy, setSortBy] = useState<SortBy>("Deadline")
    const {user, token} = useAuth();

    async function fetchGoals(filter = 'Not Completed') {
        setError([]);
        setLoading(true);
        try {
            const {data} = await api.get(`/api/goals?filter=${filter}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const parsed = GoalResponseSchema.safeParse(data);

            if (parsed.success) {
                setGoals(
                    parsed.data.sort(
                        (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
                    )
                );
            } else {
                setError(['The incoming data structure was invalid'])
            }
        } catch (error) {
            handleError(error, setError);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!user) return;
        fetchGoals();
    }, [user]);

    async function addGoal(goal: AddGoalRequest) {
        const {data} = await api.post("/api/goals", goal, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setGoals((prev) => [...prev, data.goal]);
    }


    async function deleteGoal(id: number) {
        const prev = goals;
        setGoals(goals.filter(g => g.id !== id));

        try {
            await api.delete(`/api/goals/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            setGoals(prev);
            throw error;
        }
    }

    async function toggleStep(goalId: number, stepId: number) {
        setError([]);
        const prev = goals;
        setGoals((gList) => gList.map((g) => g.id === goalId ? {
            ...g,
            steps: g.steps.map((s) => s.id === stepId ? {...s, completed: s.completed ? 0 : 1} : s)
        } : g));

        try {
            await api.patch(`/api/steps/${stepId}/toggle`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            setGoals(prev);
            handleError(error, setError);
            throw error;
        }
    }

    async function completeGoal(goalId: number) {
        setError([]);
        const prev = goals;
        setGoals((gList) => gList.map((g) => g.id === goalId ? {...g, completed: 1} : g));

        try {
            await api.patch(`/api/goals/${goalId}/complete`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            setGoals(prev);
            throw error;
        }
    }

    async function filterGoals(filter: Filter) {
        setFilter(filter);
        await fetchGoals(filter);
    }

    function sortGoals(sort: SortBy) {
        let newSorted = sorted;

        if (sortBy === sort) {
            newSorted = sorted === "Ascending" ? "Descending" : "Ascending";
            setSorted(newSorted);
        }

        setSortBy(sort);
        const direction = newSorted === "Ascending" ? 1 : -1;

        const completedCount: (goal: GoalType) => number = goal => goal.steps.filter(step => step.completed).length;

        const sortMap = {
            Deadline: (a: GoalType, b: GoalType) => direction * (new Date(a.deadline).getTime() - new Date(b.deadline).getTime()),
            "Goal List": (a: GoalType, b: GoalType) => direction * a.goal.localeCompare(b.goal),
            Completed: (a: GoalType, b: GoalType) => direction * (completedCount(a) - completedCount(b)),
            "Achieved At": (a: GoalType, b: GoalType) => direction * (new Date(a.achieved_at!).getTime() - new Date(b.achieved_at!).getTime()),
            Progression: (a: GoalType, b: GoalType) => direction * (completedCount(a) / a.steps.length - completedCount(b) / b.steps.length),
        }

        setGoals((prev) => [...prev].sort(sortMap[sort]));
    }


    return (
        <GoalContext.Provider value={{
            goals,
            loading,
            error,
            setLoading,
            setError,
            addGoal,
            deleteGoal,
            toggleStep,
            completeGoal,
            filter,
            filterGoals,
            sorted,
            sortBy,
            sortGoals,
        }}>
            {children}
        </GoalContext.Provider>
    );
}
