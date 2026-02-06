import Goal from "../goal/Goal";
import {useContext, useState} from "react";
import TableTools from "./TableTools";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import {GoalContext} from "../../contexts/GoalContext.js";
import LoadingComponent from "../LoadingComponent";
import {Goal} from "../../types/Goal";

interface GoalTableProps {
    goals: Goal[];
}

export default function GoalTable({goals}: GoalTableProps) {
    const [openGoalId, setOpenGoalId] = useState<number | null>(null);
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