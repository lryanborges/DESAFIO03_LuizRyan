import { z } from "zod"
import { stringNumberDefaultParser, stringNumberParser } from "../string-number-parser.js"
import { stringArrayParser } from "../string-array-parser.js"

export const queryCarParser = z.object({
    status: z.enum(["ativo", "inativo"]),
    licensePlateEnd: z.string(),
    brand: z.string(),
    model: z.string(),
    items: stringArrayParser,
    km: stringNumberParser,
    untilYear: stringNumberParser,
    fromYear: stringNumberParser,
    minPrice: stringNumberParser,
    maxPrice: stringNumberParser,
    order: z.enum(["price", "year", "km"]).default("year"),
    orderDirection: z.enum(["ASC", "DESC"]).default("ASC"),
    page: stringNumberDefaultParser(1),
    limit: stringNumberDefaultParser(10)
}).strict().partial()
