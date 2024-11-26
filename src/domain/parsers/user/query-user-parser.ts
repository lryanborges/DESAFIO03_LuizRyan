import { z } from "zod"
import { stringNumberDefaultParser } from "../string-number-parser.js"

export const queryUserParser = z.object({
    name: z.string().min(1),
    email: z.string().min(1),
    excludedAt: z.string().date(),
    order: z.enum(["name", "createdAt", "excludedAt"]).default("name"),
    orderDirection: z.enum(["ASC", "DESC"]).default("ASC"),
    page: stringNumberDefaultParser(1),
    limit: stringNumberDefaultParser(10),
    excluded: z.boolean()
}).strict().partial()
