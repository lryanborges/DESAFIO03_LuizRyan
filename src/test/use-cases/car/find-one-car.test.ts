import { findManyCar } from "../../../domain/use-cases/car/find-many-car.js";
import { findOneCar } from "../../../domain/use-cases/car/find-one-car.js";
import { v4 as uuidv4 } from "uuid";

describe("Find one car", () => {
    test("Should find one specific car by id", async () => {
        const carToFind = await findManyCar.exec({ licensePlateEnd: "ABD1234" });
        const carId = carToFind.data.at(0).id;
        const car = await findOneCar.exec(carId);

        expect(car.id).toBe(carId);
        expect(car).toHaveProperty("brand");
        expect(car).toHaveProperty("model");
        expect(car).toHaveProperty("year");
        expect(car).toHaveProperty("price");
        expect(car).toHaveProperty("status");
    });

    test("Should not allow to find a car with wrong id", async () => {
        const randomUUID = uuidv4();

        await expect(findOneCar.exec(randomUUID)).rejects.toThrow(
            "car not found."
        );
    });
})