import {useContext} from "react";
import {Link} from "react-router-dom";
import ErrorComponent from "../components/ErrorComponent.jsx";
import LoadingComponent from "../components/LoadingComponent.jsx";
import useAuthRedirect from "../hooks/useAuthRedirect.js";
import GoalTable from "../components/GoalTable.jsx";
import {GoalContext} from "../contexts/GoalContext.js";

export default function Home() {
    useAuthRedirect();
    const {goals, loading, error} = useContext(GoalContext);

    return (<>
        {loading && <LoadingComponent/>}
        {error && <ErrorComponent message={error} />}

        {!loading && !error && (
            goals.length > 0  ? (
                    <GoalTable goals={goals}/>
                )
                : (
                    <p>You have no goals yet!<br/>Click<Link className="text-blue-600 hover:text-blue-300"
                                                             to='/create'> here </Link>to set a new goal.</p>
                )
        )}
    </>)
}