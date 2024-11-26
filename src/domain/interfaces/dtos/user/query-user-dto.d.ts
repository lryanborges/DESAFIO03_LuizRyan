import {z} from "zod"
import { queryUserParser } from "../../../parsers/user/query-user-parser.js"

export type QueryUserDTO = z.infer<typeof queryUserParser>
