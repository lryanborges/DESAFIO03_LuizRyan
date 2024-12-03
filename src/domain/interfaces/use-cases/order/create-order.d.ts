import Order from "../../../models/order.ts";
import { CreateOrderDTO } from "../../dtos/order/create-order-dto.js";

export interface CreateOrder {
    exec(data:CreateOrderDTO):Promise<Order>
}
