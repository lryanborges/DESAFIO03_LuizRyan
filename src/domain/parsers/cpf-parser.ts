import { z } from "zod"
import { isCpf } from "validator-brazil"

export const CPFParser = z.string()
    .min(11)
    .max(11)
    .refine(isCpf, {
        message: "This cpf is not valid"
    })
