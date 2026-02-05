import {z} from "zod";

const AiNewGoalStepsTypeSchema = z.object({
   step: z.string(),
   description: z.string(),
});

export const AiNewGoalTypeSchema = z.object({
    goal: z.string(),
    steps: z.array(AiNewGoalStepsTypeSchema),
});

export type AiNewGoalType = z.infer<typeof AiNewGoalTypeSchema>;