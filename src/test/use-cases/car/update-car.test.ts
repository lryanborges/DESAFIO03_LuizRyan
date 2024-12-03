import { datasource } from "../../../data/data-source.js"
import { UpdateCarDTO } from "../../../domain/interfaces/dtos/car/update-car-dto.js"
import { updateCar } from "../../../domain/use-cases/car/update-car.js"
import CarItem from "../../../domain/models/car-item.js"
import { deleteCar } from "../../../domain/use-cases/car/delete-car.js";

describe("Update car", () => {

  const carId = "f6eaf30f-cc26-4341-89cf-6573420a7a61";

  test("Should update a car successfully", async () => {

    const updateCarData: UpdateCarDTO = {
      status: "inativo",
      licensePlate: "ABD1234", // same license plate
      brand: "Updated Brand",
      model: "Updated Model",
      km: 120000,
      year: 2022,
      items: ["UpdatedItem1", "UpdatedItem2"],
      price: 80000
    };

    const updatedCar = await updateCar.exec(carId, updateCarData);
    const items = await datasource.getRepository("cars_items").find({
      where: { car: { id: updatedCar.id } }
    });
    const itemNames = items.map((item: CarItem) => item.name);

    expect(updatedCar).toHaveProperty("id");
    expect(updatedCar.id).toBe(carId);
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
      licensePlate: "ABC1234",
      brand: "Brand",
      model: "Model",
      km: 50000,
      year: 2010,
      items: ["Item1", "Item2"],
      price: 70000
    };

    await expect(updateCar.exec(carId, updateCarData)).rejects.toThrow(
      "O ano 2010 é inválido. Deve estar entre 2014 e 2025."
    );
  });

  test("Should not allow updating a car with duplicate license plate", async () => {
    const updateCarData: UpdateCarDTO = {
      status: "ativo",
      licensePlate: "AAA1000", // placa já utilizada
      brand: "Brand",
      model: "Model",
      km: 60000,
      year: 2020,
      items: ["Item1", "Item2"],
      price: 65000
    };

    await expect(updateCar.exec(carId, updateCarData)).rejects.toThrow(
      "there is already a car with this data"
    );
  });

  test("Should allow updating a car without some fields", async () => {
    const updateCarData: UpdateCarDTO = {
      status: "inativo",
      licensePlate: "ABD1234"
    };

    const updatedCar = await updateCar.exec(carId, updateCarData);

    expect(updatedCar.status).toBe(updateCarData.status);
  });

  test("Should not allow update a deleted car", async () => {

    const carIdToDelete = "56bcd8cb-0449-42a9-9bf7-a949c1b53859";

    const updateCarData: UpdateCarDTO = {
        brand: "Any Brand"
    };

    await deleteCar.exec(carIdToDelete);

    await expect(updateCar.exec(carIdToDelete, updateCarData)).rejects.toThrow(
        "This car is already deleted and cannot be deleted again."
      );
  })
});
