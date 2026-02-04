import Goal from "../goal/Goal.jsx";
import {useContext, useState} from "react";
import TableTools from "./TableTools.jsx";
import TableHeader from "./TableHeader.jsx";
import TableBody from "./TableBody.jsx";
import {GoalContext} from "../../contexts/GoalContext.js";
import LoadingComponent from "../LoadingComponent.tsx";

export default function GoalTable({goals}) {
    const [openGoalId, setOpenGoalId] = useState(null);
    const {loading} = useContext(GoalContext);

    return (
        <div className='my-8 text-sm md:text-base mx-auto max-w-full md:px-[clamp(4rem,10vw,16rem)]'>
            <TableTools/>

            <TableHeader/>

            <TableBody>
                {loading ? <LoadingComponent />
                    : goals.length > 0 ? (
                        goals.map(goal => (
                            <Goal key={goal.id} goal={goal} open={openGoalId === goal.id}
                                  setOpen={() => setOpenGoalId(prev => (prev === goal.id ? null : goal.id))}/>
                        ))
                    ) :
                    <p className='m-4 font-bold'>No goals found.</p>
                }
            </TableBody>
        </div>
    )
}