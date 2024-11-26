import {z} from "zod"
import { updateClientParser } from "../../../parsers/client/update-client-parser.ts"

export type UpdateClientDTO = z.infer<typeof updateClientParser>
