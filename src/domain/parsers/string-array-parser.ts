import { z } from "zod"

export const stringArrayParser = z
    .string()
    .transform((v:string) => v.split(","))
    .refine((items) => {
        const set = new Set(items)
        return items.length === set.size
    },
        { message: "Array elements must be unique" }
    )
