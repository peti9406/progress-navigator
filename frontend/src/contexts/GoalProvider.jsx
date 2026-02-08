import {useContext, useEffect, useState} from "react";
import api from "../api/axios.ts";
import {GoalContext} from "./GoalContext.js";
import AuthContext from "./AuthContext.ts";

export function GoalProvider({children}) {
    const [goals, setGoals] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState("Not Completed");
    const [sorted, setSorted] = useState("Ascending");
    const [sortBy, setSortBy] = useState("Deadline")
    const {user} = useContext(AuthContext);

    async function fetchGoals(filter = 'Not Completed') {
        setLoading(true);
        setError(null);
        try {
            await api.get('/sanctum/csrf-cookie');
            const {data} = await api.get(`/api/goals?filter=${filter}`);
            setGoals(data.sort((a, b) => new Date(a.deadline) - new Date(b.deadline)));
        } catch (error) {
            setError(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!user) return;
        fetchGoals();
    }, [user]);

    async function addGoal(goal) {
        await api.get("/sanctum/csrf-cookie");
        const {data} = await api.post("/api/goals", goal);
        setGoals((prev) => [...prev, data.goal]);
    }


    async function deleteGoal(id) {
        const prev = goals;
        setGoals(goals.filter(g => g.id !== id));

        try {
            await api.delete(`/api/goals/${id}`);
        } catch (error) {
            setGoals(prev);
            throw error;
        }
    }

    async function toggleStep(goalId, stepId) {
        setError(null);
        const prev = goals;
        setGoals((gList) => gList.map((g) => g.id === goalId ? {
            ...g,
            steps: g.steps.map((s) => s.id === stepId ? {...s, completed: s.completed ? 0 : 1} : s)
        } : g));

        try {
            await api.get("/sanctum/csrf-cookie");
            await api.patch(`/api/steps/${stepId}/toggle`);
        } catch (error) {
            setGoals(prev);
            setError(error.response?.data?.errors || error.message);
            throw error;
        }
    }

    async function completeGoal(goalId) {
        setError(null);
        const prev = goals;
        setGoals((gList) => gList.map((g) => g.id === goalId ? {...g, completed: 1} : g));

        try {
            await api.get("/sanctum/csrf-cookie");
            await api.patch(`/api/goals/${goalId}/complete`);
        } catch (error) {
            setGoals(prev);
            throw error;
        }
    }

    async function filterGoals(filter) {
        setFilter(filter);
        await fetchGoals(filter);
    }

    function sortGoals(sort) {
        let newSorted = sorted;

        if (sortBy === sort) {
            newSorted = sorted === "Ascending" ? "Descending" : "Ascending";
            setSorted(newSorted);
        }

        setSortBy(sort);
        const direction = newSorted === "Ascending" ? 1 : -1;

        const completedCount = goal => goal.steps.filter(step => step.completed).length;

        const sortMap = {
            Deadline: (a, b) => direction * (new Date(a.deadline) - new Date(b.deadline)),
            "Goal List": (a, b) => direction * a.goal.localeCompare(b.goal),
            Completed: (a, b) => direction * (completedCount(a) - completedCount(b)),
            "Achieved At": (a, b) => direction * (new Date(a["achieved_at"]) - new Date(b["achieved_at"])),
            Progression: (a, b) => direction * (completedCount(a) / a.steps.length - completedCount(b) / b.steps.length),
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
