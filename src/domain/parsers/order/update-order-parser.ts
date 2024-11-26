import { z } from "zod"
import { CPFParser } from "../cpf-parser.js"
import { zipCodeParser } from "../zip-code-parser.js"

export const updateOrderParser = z.object({
    dateStart: z
        .string()
        .datetime()
        .refine(
            (date) => new Date(date) >= new Date(),
            { message: "Start DateTime cannot be in the past" }
        ),
    dateEnd: z.string().datetime(),
    cep: zipCodeParser,
    status: z.enum(["cancelado", "aprovado"]),
    cpf: CPFParser
}).strict().partial().refine(({ dateStart, dateEnd }) =>
    dateStart ? new Date(dateEnd) >= new Date(dateStart) : true,
    {
        message: "End DateTime cannot be before Start DateTime"
    }
)
