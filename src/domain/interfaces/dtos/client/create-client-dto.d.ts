import {z} from "zod"
import { createClientParser } from "../../../parsers/client/create-client-parser.ts"

export type CreateClientDTO = z.infer<typeof createClientParser>
