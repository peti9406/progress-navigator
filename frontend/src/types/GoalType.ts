import {z} from "zod";
import { StepTypeSchema} from "./Step";

const GoalTypeSchema = z.object({
    id: z.number(),
    goal: z.string(),
    deadline: z.string(),
    achieved_at: z.string().nullable(),
    completed: z.union([z.literal(0), z.literal(1)]),
    steps: z.array(StepTypeSchema),
})

export type GoalType = z.infer<typeof GoalTypeSchema>;
export const GoalResponseSchema = z.array(GoalTypeSchema);