import { ResourceAlredyExistsError } from "../../../framework/express/exceptions/resource-alredy-exists-error.js"
import { CreateCarDTO } from "../../interfaces/dtos/car/create-car-dto.js"
import { CreateCar } from "../../interfaces/use-cases/car/create-car.js"
import CarItem from "../../models/car-item.js"
import Car from "../../models/car.js"
import { createCarParser } from "../../parsers/car/create-car-parser.js"
import { carRepository } from "../../repositories/car-repository.js"

export const createCar = new class implements CreateCar {
    public async exec(data: CreateCarDTO): Promise<Car> {

        const car = createCarParser.parse(data);

        // check if same car
        const carExists = await carRepository.findOne({ where: { licensePlate : car.licensePlate } })

        if (carExists) {
            throw new ResourceAlredyExistsError("car")
        }

        const newCar = carRepository.create(car)

        await carRepository.save(newCar)

        const carItems = data.items.map(itemName => {
            const carItem = new CarItem(itemName, newCar);
            return carItem;
        });

        await carRepository.manager.save(carItems);

        return newCar;

    }
}
