import { CreateOrderDTO } from "../../dtos/order/create-order-dto.js";

export interface CreateOrder {
    exec(data:CreateOrderDTO):Promise<void>
}
