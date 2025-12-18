import {useContext} from "react";
import ErrorComponent from "../components/ErrorComponent.jsx";
import LoadingComponent from "../components/LoadingComponent.jsx";
import useAuthRedirect from "../hooks/useAuthRedirect.js";
import GoalTable from "../components/table/GoalTable.jsx";
import {GoalContext} from "../contexts/GoalContext.js";

export default function Home() {
    useAuthRedirect();
    const {goals, loading, error} = useContext(GoalContext);

    return (<>
        {loading && <LoadingComponent/>}
        {error && <ErrorComponent message={error}/>}

        {!loading && !error && (
            <GoalTable goals={goals}/>
        )}
    </>)
}