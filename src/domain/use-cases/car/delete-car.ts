import { ResourceNotFoundError } from "../../../framework/express/exceptions/resource-not-found-error.js"
import { DeleteCar } from "../../interfaces/use-cases/car/delete-car.js"
import Car from "../../models/car.js"
import { uuidParser } from "../../parsers/uuid-parser.js"
import { carRepository } from "../../repositories/car-repository.js"

export const deleteCar = new class implements DeleteCar{
    async exec(id: string): Promise<Car> {
        uuidParser.parse(id)
        const car = await carRepository.findOne({ where: { id } })
        if(!car) {
            throw new ResourceNotFoundError("car")
        }
        car.status = "excluído"
        await carRepository.save(car)

        return car;
    }
}
