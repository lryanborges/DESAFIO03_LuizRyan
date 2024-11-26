import { z } from "zod"
import { createCarParser } from "../../../parsers/car/create-car-parser.js"

export type CreateCarDTO = z.infer<typeof createCarParser>
