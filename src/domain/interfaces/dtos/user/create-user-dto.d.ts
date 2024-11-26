import {z} from "zod"
import { createUserParser } from "../../../parsers/user/create-user-parser.ts"

export type CreateUserDTO = z.infer<typeof createUserParser>
