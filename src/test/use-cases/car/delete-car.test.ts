import { CreateCarDTO } from "../../../domain/interfaces/dtos/car/create-car-dto.js";
import { createCar } from "../../../domain/use-cases/car/create-car.js";
import { deleteCar } from "../../../domain/use-cases/car/delete-car.js";
import { v4 as uuidv4 } from "uuid";

describe("Delete car", () => {

    let idToDelete;

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

        const car = await createCar.exec(createCarData);
        idToDelete = car.id;
      });
      

    test("Should delete a car successfully", async () => {
        const deletedCar = await deleteCar.exec(idToDelete);
    
        expect(deletedCar.status).toBe("excluído");
    });
   
    test("Should not delete a car with wrong id", async () => {
        const randomUUID = uuidv4();

        await expect(deleteCar.exec(randomUUID)).rejects.toThrow(
            "car not found."
        );

    });

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