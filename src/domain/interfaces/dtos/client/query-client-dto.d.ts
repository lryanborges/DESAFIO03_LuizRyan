import {z} from "zod"
import { queryClientParser } from "../../../parsers/client/query-client-parser.ts"

export type QueryClientDTO = z.infer<typeof queryClientParser>
