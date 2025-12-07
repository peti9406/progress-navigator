import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import api from "../api/axios.js";
import ErrorComponent from "../components/ErrorComponent.jsx";
import LoadingComponent from "../components/LoadingComponent.jsx";
import GoalCard from "../components/GoalCard.jsx";
import useAuthRedirect from "../hooks/useAuthRedirect.js";
import useAuth from "../hooks/useAuth.js";

export default function Home() {
    const {user} = useAuth();
    const [goals, setGoals] = useState(null);
    const [completedGoals, setCompletedGoals] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [openGoalId, setOpenGoalId] = useState(null);

    useAuthRedirect();

    useEffect(() => {
        async function loadGoals() {
            if (!user) return;

            setLoading(true);
            try {
                await api.get('/sanctum/csrf-cookie');
                const {data} = await api.get('/api/goals?completed=0');
                setGoals(data);

                const completed = await api.get('/api/goals?completed=1');
                setCompletedGoals(completed.data);
            } catch (error) {
                setError(error.response?.data?.message || error.message);
            } finally {
                setLoading(false);
            }
        }

        loadGoals();
    }, [user]);

    return (<>
        {loading && <LoadingComponent/>}
        {error && <ErrorComponent message={error}/>}

        {!loading && !error && (
            goals?.length > 0 ? (
                    <>
                        <div className='mt-6 flex flex-wrap gap-4 justify-center'>
                            {goals.map((goal) => <GoalCard key={goal.id} goal={goal}
                                                           open={openGoalId === goal.id}
                                                           setOpen={() => setOpenGoalId(prev => (prev === goal.id ? null : goal.id))}/>)}
                        </div>

                        <div className='mt-6 flex flex-wrap gap-4 justify-center'>
                            {completedGoals.map((goal) => <GoalCard key={goal.id} goal={goal}
                                                           open={openGoalId === goal.id}
                                                           setOpen={() => setOpenGoalId(prev => (prev === goal.id ? null : goal.id))}/>)}
                        </div>
                    </>)
                : (
                    <p>You have no goals yet!<br/>Click<Link className="text-blue-600 hover:text-blue-300"
                                                             to='/create'> here </Link>to set a new goal.</p>
                )
        )}
    </>)
}