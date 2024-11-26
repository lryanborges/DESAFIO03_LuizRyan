import { z } from "zod";


export const authParser = z.object({
    email: z.string().email(),
    password: z.string().min(8)
}).strict()
