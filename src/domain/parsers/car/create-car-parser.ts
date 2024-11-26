import { z } from "zod"
import { uniqueStringArrayParser } from "../unique-string-array-parser.js"
import { carYearParser } from "../car-year-parser.js"

export const createCarParser = z.object({
    status: z.enum(["ativo", "inativo", "excluído"]),
    licensePlate: z.string().length(7),
    brand: z.string().min(1),
    model: z.string().min(1),
    km: z.number().gte(0),
    year: carYearParser,
    items: uniqueStringArrayParser,
    price: z.number().gt(0)
}).strict()
