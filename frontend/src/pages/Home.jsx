import {useContext} from "react";
import ErrorComponent from "../components/ErrorComponent.tsx";
import useAuthRedirect from "../hooks/useAuthRedirect.js";
import GoalTable from "../components/table/GoalTable.tsx";
import {GoalContext} from "../contexts/GoalContext.js";

export default function Home() {
    useAuthRedirect();
    const {goals, error} = useContext(GoalContext);

    return (<>
        {error && <ErrorComponent message={error}/>}

        {!error && (
            <GoalTable goals={goals}/>
        )}
    </>)
}