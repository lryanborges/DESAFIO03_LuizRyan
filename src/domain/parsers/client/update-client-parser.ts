import { z } from "zod"
import { CPFParser } from "../cpf-parser.js"
import { phoneParser } from "../phone-parser.js"

export const updateClientParser = z.object({
    name: z.string(),
    birthDate: z.string().date(),
    cpf: CPFParser,
    email: z.string().email(),
    phone: phoneParser
}).strict().partial()
