import { datasource } from "../../../data/data-source.js"
import { ResourceNotFoundError } from "../../../framework/express/exceptions/resource-not-found-error.js"
import { CarDTO, Status } from "../../interfaces/dtos/car/car-dto.js"
import { FindOneCar } from "../../interfaces/use-cases/car/find-one-car.js"
import CarItem from "../../models/car-item.js"
import { uuidParser } from "../../parsers/uuid-parser.js"
import { carRepository } from "../../repositories/car-repository.js"


export const findOneCar = new class implements FindOneCar {
    async exec(id: string): Promise<CarDTO> {
        uuidParser.parse(id)
        const found = await carRepository.findOne({ where: { id } })

        if (!found) {
            throw new ResourceNotFoundError("car")
        }

        const carItems = await datasource.getRepository("cars_items").findBy({ car: found })


        const returnValue: CarDTO = {
            id: found.id,
            licensePlate: found.licensePlate,
            brand: found.brand,
            model: found.model,
            km: found.km,
            year: found.year,
            price: found.price,
            createdAt: found.createdAt,
            items: carItems.map((item: CarItem) => item.name),
            status: found.status as Status
        }

        return returnValue
    }
}
