import {z} from "zod";

const AiNewGoalStepsTypeSchema = z.object({
   step: z.string(),
   description: z.string(),
});

export const AiNewGoalTypeSchema = z.object({
    goal: z.string(),
    steps: z.array(AiNewGoalStepsTypeSchema),
});

export type AiNewGoal = z.infer<typeof AiNewGoalTypeSchema>;