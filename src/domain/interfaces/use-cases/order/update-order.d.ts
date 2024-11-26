import { UpdateOrderDTO } from "../../dtos/order/update-order-dto.js";

export interface UpdateOrder {
    exec(id: string, data: UpdateOrderDTO): Promise<void>
}
