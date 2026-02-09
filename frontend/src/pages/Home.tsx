import ErrorComponent from "../components/ErrorComponent";
import useAuthRedirect from "../hooks/useAuthRedirect";
import GoalTable from "../components/table/GoalTable";
import useGoals from "../hooks/useGoals";

export default function Home() {
    useAuthRedirect();
    const {goals, error} = useGoals();

    return (<>
        {error.length > 0 && <ErrorComponent messages={error}/>}

        {error.length === 0 && <GoalTable goals={goals} />}
    </>)
}