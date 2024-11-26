import { z } from "zod"
import { authParser } from "../../../parsers/auth-parser.ts"

export type AuthDTO = z.infer<typeof authParser>
