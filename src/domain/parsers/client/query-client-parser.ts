import { z } from "zod"
import { stringNumberDefaultParser } from "../string-number-parser.js"
import { CPFParser } from "../cpf-parser.js"
import { phoneParser } from "../phone-parser.js"

export const queryClientParser = z.object({
    name: z.string().optional(),
    birthDate: z.string().date().optional(),
    cpf: CPFParser.optional(),
    email: z.string().optional(),
    phone: phoneParser.optional(),
    excludedAt: z.string().date().optional(),
    orderBy: z.enum(["createdAt", "excludedAt"]).default("createdAt"),
    orderDirection: z.enum(["ASC", "DESC"]).default("ASC"),
    page: stringNumberDefaultParser(1),
    limit: stringNumberDefaultParser(10)
}).strict();
