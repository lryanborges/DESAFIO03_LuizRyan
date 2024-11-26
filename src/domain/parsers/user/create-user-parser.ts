import { z } from "zod"

export const createUserParser = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8)
}).strict()
