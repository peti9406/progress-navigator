import {useEffect, useState} from "react";
import api from "../api/axios.js";
import {GoalContext} from "./GoalContext.js";

export function GoalProvider({children}) {
    const [goals, setGoals] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function loadGoals() {
            setLoading(true);
            try {
                await api.get('/sanctum/csrf-cookie');
                const {data} = await api.get('/api/goals?completed=0');
                setGoals(data);
            } catch (error) {
                setError(error.response?.data?.message || error.message);
            } finally {
                setLoading(false);
            }
        }

        loadGoals();
    }, []);

    async function deleteGoal(id) {
        await api.delete(`/api/goals/${id}`);
        setGoals(goals.filter(g => g.id !== id));
    }

    return (
        <GoalContext.Provider value={{
            goals,
            deleteGoal,
            setGoals,
            loading,
            error,
        }}>
            {children}
        </GoalContext.Provider>
    );
}
