import {z} from "zod";

export const StepTypeSchema = z.object({
    id: z.number(),
    step: z.string(),
    completed: z.union([z.literal(0), z.literal(1)]),
});

export type StepType = z.infer<typeof StepTypeSchema>;