import { z } from "zod"


export const uniqueStringArrayParser = z
    .string()
    .array()
    .min(1)
    .max(5)
    .refine((items) => {
        const set = new Set(items)
        return items.length === set.size
    },
        { message: "Array elements must be unique" }
    )
