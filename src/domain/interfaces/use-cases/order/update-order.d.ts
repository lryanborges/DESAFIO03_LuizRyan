import Order from "../../../models/order.ts";
import { UpdateOrderDTO } from "../../dtos/order/update-order-dto.js";

export interface UpdateOrder {
    exec(id: string, data: UpdateOrderDTO): Promise<Order>
}
