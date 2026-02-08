import {z} from "zod";
import {UserSchema} from "../User";

export const UsersResponseSchema = z.object({
    current_page: z.number(),
    last_page: z.number(),
    data: z.array(UserSchema),
})