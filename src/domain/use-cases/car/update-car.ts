import { HttpError } from "../../../framework/express/exceptions/http-error.js"
import { ResourceNotFoundError } from "../../../framework/express/exceptions/resource-not-found-error.js"
import { UpdateCarDTO } from "../../interfaces/dtos/car/update-car-dto.js"
import { UpdateCar } from "../../interfaces/use-cases/car/update-car.js"
import CarItem from "../../models/car-item.js"
import { updateCarParser } from "../../parsers/car/update-car-parser.js"
import { uuidParser } from "../../parsers/uuid-parser.js"
import { carItemRepository } from "../../repositories/car-item-repository.js"
import { carRepository } from "../../repositories/car-repository.js"

export const updateCar = new class implements UpdateCar {
    async exec(id: string, data: UpdateCarDTO): Promise<void> {
        uuidParser.parse(id)
        const editData = updateCarParser.parse(data)

        const car = await carRepository.findOne({ where: { id } })

        if (!car) {
            throw new ResourceNotFoundError("car")
        }

        if (car.status === "excluído") {
            throw new HttpError("This car is already deleted and cannot be deleted again.", 409)
        }

        if (editData.status !== undefined) {
            car.status = editData.status
        }
        if (editData.licensePlate !== undefined) {
            car.licensePlate = editData.licensePlate
        }
        if (editData.brand !== undefined) {
            car.brand = editData.brand
        }
        if (editData.model !== undefined) {
            car.model = editData.model
        }
        if (editData.km !== undefined) {
            car.km = editData.km
        }
        if (editData.year !== undefined) {
            car.year = editData.year
        }
        if (editData.price !== undefined) {
            car.price = editData.price
        }
        if (editData.items !== undefined) {
            await carItemRepository.delete({ car: car })
            const carItems = editData.items.map(itemName => {
                return new CarItem(itemName, car);
            });
            await carRepository.manager.save(carItems)
        }

        await carRepository.save(car)

    }
}
