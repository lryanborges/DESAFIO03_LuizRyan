import {z} from "zod"
import { createOrderParser } from "../../../parsers/order/create-order-parser.ts"

export type CreateOrderDTO = z.infer<typeof createOrderParser>
