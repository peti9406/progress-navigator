import {z} from "zod";

export const AdviceTypeSchema = z.object({
    reflection: z.string(),
    steps: z.array(z.string()),
});

export type AdviceType = z.infer<typeof AdviceTypeSchema>;