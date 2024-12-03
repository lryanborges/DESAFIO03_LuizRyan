import { HttpError } from "../../../framework/express/exceptions/http-error.js";
import { ResourceNotFoundError } from "../../../framework/express/exceptions/resource-not-found-error.js";
import { DeleteOrder } from "../../interfaces/use-cases/order/delete-order.js";
import Order, { OrderStatus } from "../../models/order.js";
import { uuidParser } from "../../parsers/uuid-parser.js";
import { orderRepository } from "../../repositories/order-repository.js";

export const deleteOrder = new class implements DeleteOrder {
    async exec(id: string): Promise<Order> {
        uuidParser.parse(id)
        const order = await orderRepository.findOne({ where: { id } });

        if (!order) {
            throw new ResourceNotFoundError("order");
        }

        if (order.status !== "aberto") {
            throw new HttpError("Order is already closed", 409);
        }

        order.status = OrderStatus.Canceled;

        return await orderRepository.save(order);
    }
}
