import { z } from "zod"
import { updateCarParser } from "../../../parsers/car/update-car-parser.ts"

export type UpdateCarDTO = z.infer<typeof updateCarParser>
