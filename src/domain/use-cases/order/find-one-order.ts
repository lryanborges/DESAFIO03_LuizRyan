import { datasource } from "../../../data/data-source.js"
import { ResourceNotFoundError } from "../../../framework/express/exceptions/resource-not-found-error.js"
import { FindOneOrderDTO } from "../../interfaces/dtos/order/find-one-order-dto.js"
import { FindOneOrder } from "../../interfaces/use-cases/order/find-one-order.js"
import { uuidParser } from "../../parsers/uuid-parser.js"
import { carRepository } from "../../repositories/car-repository.js"
import { orderRepository } from "../../repositories/order-repository.js"

export const findOneOrder = new class implements FindOneOrder {
    async exec(id: string): Promise<FindOneOrderDTO> {
        uuidParser.parse(id)
        const order = await orderRepository.findOne({where: {id}})

        if (!order) {
            throw new ResourceNotFoundError("order")
        }

        const orderCar = await carRepository.findOne({where: {id: order.car.id }})
        const carItems = await datasource.getRepository("cars_items").find({where: {id: orderCar.id}})

        return {
            ...order,
            car: {...orderCar, items: carItems.map((item) => item.name)},
            createdAt: order.createdAt.toString(),
            startDate: null,
            endDate: null
        }
    }
}
