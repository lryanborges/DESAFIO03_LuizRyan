import { isCep } from "validator-brazil"
import { z } from "zod"

export const zipCodeParser = z
    .string()
    .min(8)
    .max(8)
    .refine(isCep, {
        message: "This CEP is not valid"
    })
