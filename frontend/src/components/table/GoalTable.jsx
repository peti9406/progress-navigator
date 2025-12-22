import Goal from "../goal/Goal.jsx";
import {useState} from "react";
import TableTools from "./TableTools.jsx";
import TableHeader from "./TableHeader.jsx";
import TableBody from "./TableBody.jsx";

export default function GoalTable({goals}) {
    const [openGoalId, setOpenGoalId] = useState(null);

    return (
        <div className='my-8 px-50 mx-auto max-w-full min-w-max'>
            <TableTools/>

            <TableHeader/>

            <TableBody>
                {goals.length > 0 ? (
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