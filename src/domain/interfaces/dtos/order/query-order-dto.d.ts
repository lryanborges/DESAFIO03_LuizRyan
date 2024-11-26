import {z} from "zod"
import { queryOrderParser } from "../../../parsers/order/query-order-parser.ts"
export type QueryOrderDTO = z.infer<typeof queryOrderParser>
