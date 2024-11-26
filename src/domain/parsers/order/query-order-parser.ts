import { z } from "zod"
import { stringNumberDefaultParser } from "../string-number-parser.js"
import { CPFParser } from "../cpf-parser.js"

const adjustStartDate = (startDate) => {
    const date = new Date(startDate)
    date.setHours(0, 0, 0, 0) 
    return date.toISOString()
};

export const queryOrderParser = z.object({
    status: z.enum(["aberto", "cancelado", "aprovado"]),
    cpf: CPFParser,
    startDate: z.string().date().transform(adjustStartDate),
    endDate: z.string().date(),
    order: z.enum(["createdAt"]).default("createdAt"),
    orderDirection: z.enum(["ASC", "DESC"]).default("ASC"),
    page: stringNumberDefaultParser(1),
    limit: stringNumberDefaultParser(10)
}).strict().partial()
