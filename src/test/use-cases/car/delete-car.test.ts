import { deleteCar } from "../../../domain/use-cases/car/delete-car.js";
import { findManyCar } from "../../../domain/use-cases/car/find-many-car.js";
import { v4 as uuidv4 } from "uuid";

describe("Delete car", () => {
    test("Should delete a car successfully", async () => {
        const carToDelete = await findManyCar.exec({ status: "ativo", model: "Model"}); // pra só excluir as geradas por testes
    
        expect(carToDelete).not.toBeNull();
    
        const deletedCar = await deleteCar.exec(carToDelete.data.at(0).id);
    
        expect(deletedCar.status).toBe("excluído");
    });
   
    test("Should not delete a car with wrong id", async () => {
        const randomUUID = uuidv4();

        await expect(deleteCar.exec(randomUUID)).rejects.toThrow(
            "car not found."
        );

    });

});