import {z} from "zod";

const UserTypeSchema = z.object({
    name: z.string(),
    email: z.string(),
    created_at: z.string(),
    goals_count: z.number(),
    isAdmin: z.union([z.literal(0), z.literal(1)])
});

export type UserType = z.infer<typeof UserTypeSchema>;