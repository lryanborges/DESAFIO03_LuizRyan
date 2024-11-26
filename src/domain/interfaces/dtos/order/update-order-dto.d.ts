import {z} from "zod"
import { updateOrderParser } from "../../../parsers/order/update-order-parser.ts"
export type UpdateOrderDTO = z.infer<typeof updateOrderParser>
