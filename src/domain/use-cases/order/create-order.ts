import { ResourceAlredyExistsError } from "../../../framework/express/exceptions/resource-alredy-exists-error.js"
import { ResourceNotFoundError } from "../../../framework/express/exceptions/resource-not-found-error.js"
import { CreateOrderDTO } from "../../interfaces/dtos/order/create-order-dto.js"
import { CreateOrder } from "../../interfaces/use-cases/order/create-order.js"
import { createOrderParser } from "../../parsers/order/create-order-parser.js"
import { carRepository } from "../../repositories/car-repository.js"
import { clientRepository } from "../../repositories/client-repository.js"
import { orderRepository } from "../../repositories/order-repository.js"

export const createOrder = new class implements CreateOrder {
    async exec(data: CreateOrderDTO): Promise<void> {
        const order = createOrderParser.parse(data)

        const carExists = await carRepository.findOne({ where: { id: order.carId } })
        if (!carExists) throw new ResourceNotFoundError("car")

        const clientExists = await clientRepository.findOne({ where: { id: order.clientId } })
        if (!clientExists) throw new ResourceNotFoundError("client")

        const orderExists = await orderRepository.findOne({ where: { car: carExists } })
        if (orderExists) throw new ResourceAlredyExistsError("order")



        const newOrder = orderRepository.create({
            ...order,
            client: clientExists,
            car: carExists
        })

        await orderRepository.save(newOrder)
    }
}
