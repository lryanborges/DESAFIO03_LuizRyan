import { z } from "zod"

export const createOrderParser = z.object({
    clientId: z.string().uuid(),
    carId: z.string().uuid()
}).strict()
