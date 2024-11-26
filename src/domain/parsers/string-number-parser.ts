import { z } from "zod"


export const stringNumberParser = z
    .string()
    .transform(Number)
    .refine((val) => !isNaN(val) && val > 0, {
        message: "must to be a positive number"
    })

export const stringNumberDefaultParser = (value:number) => z
    .string()
    .default(value.toString())
    .transform(Number)
    .refine((val) => !isNaN(val) && val > 0, {
        message: "must to be a positive number"
    })
