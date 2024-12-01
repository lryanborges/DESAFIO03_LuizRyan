import { CreateCarDTO } from "../domain/interfaces/dtos/car/create-car-dto.js"
import { createCar } from "../domain/use-cases/car/create-car.js"

describe("Create car", () => {
  test("Should create a car successfully", async () => {

    const createCarData: CreateCarDTO = {
        status: "ativo",
        licensePlate: "ABC1247",
        brand: "Brand",
        model: "Model",
        km: 100000,
        year: 2021,
        items: [
          "Item1",
          "Item2",
          "Item3"
        ],
        price: 75000
    }

    const car = await createCar.exec(createCarData)

    expect(car).toHaveProperty("id");
    
  })
})