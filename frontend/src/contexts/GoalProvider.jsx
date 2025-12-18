import {useContext, useEffect, useState} from "react";
import api from "../api/axios.js";
import {GoalContext} from "./GoalContext.js";
import AuthContext from "./AuthContext.js";

export function GoalProvider({children}) {
    const [goals, setGoals] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState("Not Completed");
    const [sorted, setSorted] = useState("Ascending");
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
        setLoading(true);
        setError(null);
        try {
            await api.get("/sanctum/csrf-cookie");
            const {data} = await api.post("/api/goals", goal);
            setGoals((prev) => [...prev, data.goal]);
        } catch (error) {
            setError(error.response?.data?.errors || error.message);
            throw error;
        } finally {
            setLoading(false);
        }
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
        setSorted(sort);

        if (sort === 'Ascending') {
            setGoals((prev) => {
                return prev.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
            });
        } else {
            setGoals((prev) => {
                return prev.sort((a,b) => new Date(b.deadline) - new Date(a.deadline))
            });
        }
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
            sortGoals,
        }}>
            {children}
        </GoalContext.Provider>
    );
}
