import axios from "axios"
import { ResourceNotFoundError } from "../../../framework/express/exceptions/resource-not-found-error.js"
import { UpdateOrderDTO } from "../../interfaces/dtos/order/update-order-dto.js"
import { UpdateOrder } from "../../interfaces/use-cases/order/update-order.js"
import { updateOrderParser } from "../../parsers/order/update-order-parser.js"
import { orderRepository } from "../../repositories/order-repository.js"
import { zipCodeParser } from "../../parsers/zip-code-parser.js"
import { uuidParser } from "../../parsers/uuid-parser.js"

export const updateOrder = new class implements UpdateOrder{
    async exec(id: string, data: UpdateOrderDTO): Promise<void> {
        uuidParser.parse(id)
        const update = updateOrderParser.parse(data)
        const order = await orderRepository.findOne({ where: { id } })
        if (!order) throw new ResourceNotFoundError("order")

        if (update.cep) {
            const {data,status} = await axios.get(
                `https://viacep.com.br/ws/${update.cep}/json/`,
                { validateStatus: () => true }
            )
            if(status!==200) zipCodeParser.parse("________")
            Object.assign(order,{
                uf: data.estado,
                city: data.localidade
            })
        }

        for (const key in update){
            if(update[key]) order[key] = update[key]
        }

        await orderRepository.save(order)
    }
}
