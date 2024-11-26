import {z} from "zod"
import { queryCarParser } from "../../../parsers/car/query-car-parser.ts"

export type QueryCarDTO = z.infer<typeof queryCarParser>
