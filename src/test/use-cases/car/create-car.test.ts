import { datasource } from "../../../data/data-source.js"
import { CreateCarDTO } from "../../../domain/interfaces/dtos/car/create-car-dto.js"
import CarItem from "../../../domain/models/car-item.js"
import { createCar } from "../../../domain/use-cases/car/create-car.js"

describe("Create car", () => {
  test("Should create a car successfully", async () => {

    //jest.mock("../domain/repositories/car-repository.js");
    //const mockCarRepository = carRepository as jest.Mocked<typeof carRepository>;

    const createCarData: CreateCarDTO = {
        status: "ativo",
        licensePlate: generateLicensePlate(),
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
    const items = await datasource.getRepository("cars_items").find( {where: { car : {id: car.id }}});
    const itemNames = items.map((item: CarItem) => item.name);

    expect(car).toHaveProperty("id");
    expect(car.id).toBeTruthy();
    expect(itemNames).toEqual(createCarData.items);
  })

  test("Should not allow creating a car with the same license plate", async () => {
    const createCarData: CreateCarDTO = {
      status: "ativo",
      licensePlate: generateLicensePlate(), 
      brand: "Brand",
      model: "Model",
      km: 100000,
      year: 2021,
      items: ["Item1", "Item2", "Item3"],
      price: 75000
    };
  
    await createCar.exec(createCarData);

    await expect(createCar.exec(createCarData)).rejects.toThrow(
      "there is already a car with this data"
    );
  });

  test("Should not allow the creation of a car older than 10 years", async () => {
    const createCarData: CreateCarDTO = {
      status: "ativo",
      licensePlate: generateLicensePlate(), 
      brand: "Brand",
      model: "Model",
      km: 100000,
      year: 2012,
      items: ["Item10", "Item20", "Item30"],
      price: 75000
    };
  
    await expect(createCar.exec(createCarData)).rejects.toThrow(
      "O ano 2012 é inválido. Deve estar entre 2014 e 2025."
    );
  }); 

  test("Should not allow the creation of a car without any mandatory fields", async () => {
    const createCarData: CreateCarDTO = {
      status: "ativo",
      licensePlate: "FFF1234", 
      brand: "Brand",
      km: 100000,
      year: 2018,
      items: ["Item100", "Item200", "Item300"],
      price: 75000
    };
  
    await expect(createCar.exec(createCarData)).rejects.toThrow(
      "Required"
    );
  }); 
  
})

function generateLicensePlate(): string {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  let licensePlate = "";

  for (let i = 0; i < 3; i++) {
    licensePlate += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  for (let i = 0; i < 4; i++) {
    licensePlate += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }

  return licensePlate;
}
