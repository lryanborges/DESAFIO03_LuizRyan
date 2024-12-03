import { datasource } from "../../../data/data-source.js"
import { UpdateCarDTO } from "../../../domain/interfaces/dtos/car/update-car-dto.js"
import { updateCar } from "../../../domain/use-cases/car/update-car.js"
import CarItem from "../../../domain/models/car-item.js"
import { deleteCar } from "../../../domain/use-cases/car/delete-car.js";
import { createCar } from "../../../domain/use-cases/car/create-car.js";
import { CreateCarDTO } from "../../../domain/interfaces/dtos/car/create-car-dto.js";

describe("Update car", () => {

  let idToUpdate;

  beforeAll(async () => {
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

      const user = await createCar.exec(createCarData);
      idToUpdate = user.id;
  });

  test("Should update a car successfully", async () => {

    const updateCarData: UpdateCarDTO = {
      status: "inativo",
      licensePlate: generateLicensePlate(), // same license plate
      brand: "Updated Brand",
      model: "Updated Model",
      km: 120000,
      year: 2022,
      items: ["UpdatedItem1", "UpdatedItem2"],
      price: 80000
    };

    const updatedCar = await updateCar.exec(idToUpdate, updateCarData);
    const items = await datasource.getRepository("cars_items").find({
      where: { car: { id: updatedCar.id } }
    });
    const itemNames = items.map((item: CarItem) => item.name);

    expect(updatedCar).toHaveProperty("id");
    expect(updatedCar.id).toBe(idToUpdate);
    expect(updatedCar.status).toBe(updateCarData.status);
    expect(updatedCar.brand).toBe(updateCarData.brand);
    expect(updatedCar.model).toBe(updateCarData.model);
    expect(updatedCar.km).toBe(updateCarData.km);
    expect(updatedCar.year).toBe(updateCarData.year);
    expect(updatedCar.price).toBe(updateCarData.price);
    expect(itemNames).toEqual(updateCarData.items);
  });

  test("Should not allow updating a car with an invalid year", async () => {
    const updateCarData: UpdateCarDTO = {
      status: "ativo",
      licensePlate: generateLicensePlate(),
      brand: "Brand",
      model: "Model",
      km: 50000,
      year: 2010,
      items: ["Item1", "Item2"],
      price: 70000
    };

    await expect(updateCar.exec(idToUpdate, updateCarData)).rejects.toThrow(
      "O ano 2010 é inválido. Deve estar entre 2014 e 2025."
    );
  });

  test("Should not allow updating a car with duplicate license plate", async () => {
    const updateCarData: UpdateCarDTO = {
      status: "ativo",
      licensePlate: "ABD1234", // placa já utilizada
      brand: "Brand",
      model: "Model",
      km: 60000,
      year: 2020,
      items: ["Item1", "Item2"],
      price: 65000
    };

    await expect(updateCar.exec(idToUpdate, updateCarData)).rejects.toThrow(
      "there is already a car with this data"
    );
  });

  test("Should allow updating a car without some fields", async () => {
    const updateCarData: UpdateCarDTO = {
      status: "inativo",
      licensePlate: generateLicensePlate()
    };

    const updatedCar = await updateCar.exec(idToUpdate, updateCarData);

    expect(updatedCar.status).toBe(updateCarData.status);
  });

  test("Should not allow update a deleted car", async () => {

    const updateCarData: UpdateCarDTO = {
        brand: "Any Brand"
    };

    const deletedCar = await deleteCar.exec(idToUpdate);

    await expect(updateCar.exec(deletedCar.id, updateCarData)).rejects.toThrow(
        "This car is already deleted and cannot be deleted again."
      );
  })
});

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