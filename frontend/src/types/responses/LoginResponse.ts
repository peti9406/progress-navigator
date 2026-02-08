import {z} from "zod";
import {UserSchema} from "../User";

export const LoginResponseSchema = z.object({
    message: z.string(),
    user: UserSchema,
})
