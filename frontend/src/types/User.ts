import {z} from "zod";

export const UserSchema = z.object({
    id: z.number().optional(),
    name: z.string(),
    email: z.string(),
    created_at: z.string(),
    goals_count: z.number().optional(),
    is_admin: z.union([z.literal(0), z.literal(1)])
});

export type User = z.infer<typeof UserSchema>;