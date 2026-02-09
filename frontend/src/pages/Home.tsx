import ErrorComponent from "../components/ErrorComponent";
import useAuthRedirect from "../hooks/useAuthRedirect";
import GoalTable from "../components/table/GoalTable";
import useGoals from "../hooks/useGoals";
import useAuth from "../hooks/useAuth";
import LoadingComponent from "../components/LoadingComponent";

export default function Home() {
    useAuthRedirect();
    const {goals, error} = useGoals();
    const {loading} = useAuth();

    if (loading) {
        return <LoadingComponent />;
    }

    return (<>
        {error.length > 0 && <ErrorComponent messages={error}/>}

        {error.length === 0 && !loading && <GoalTable goals={goals} />}
    </>)
}