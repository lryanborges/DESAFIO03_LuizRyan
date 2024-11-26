import { z } from "zod"
import { uniqueStringArrayParser } from "../unique-string-array-parser.js"
import { carYearParser } from "../car-year-parser.js"

export const updateCarParser = z.object({
    licensePlate: z.string().length(7).optional(),
    brand: z.string().min(1).optional(),
    model: z.string().min(1).optional(),
    km: z.number().gte(0).optional(),
    status: z.enum(["ativo", "inativo"]).optional(),
    year: carYearParser,
    items: uniqueStringArrayParser.optional(),
    price: z.number().gt(0).optional()
}).strict().partial()
