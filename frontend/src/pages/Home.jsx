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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useAuthRedirect();

    useEffect(() => {
        async function loadGoals() {
            if (!user) return;

            setLoading(true);
            try {
                await api.get('/sanctum/csrf-cookie');
                const {data} = await api.get('/api/goals')
                setGoals(data);
                console.log(data);
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
                <div className='mt-6 grid lg:grid-cols-6 gap-1 md:grid-cols-3 sm:grid-cols-2 min-h-fit max-w-max min-w-max'>
                    {goals.map((goal) => <GoalCard key={goal.id} goal={goal}/>)}
                </div>) : (
                <p>You have no goals yet!<br/>Click<Link className="text-blue-600 hover:text-blue-300"
                                                         to='/create'> here </Link>to set a new goal.</p>
            )
        )}
    </>)
}