import { CreateCarDTO } from "../../../domain/interfaces/dtos/car/create-car-dto.js";
import { CreateClientDTO } from "../../../domain/interfaces/dtos/client/create-client-dto.js";
import { CreateOrderDTO } from "../../../domain/interfaces/dtos/order/create-order-dto.js";
import { createCar } from "../../../domain/use-cases/car/create-car.js";
import { createClient } from "../../../domain/use-cases/client/create-client.js";
import { createOrder } from "../../../domain/use-cases/order/create-order.js";
import { generate as generateCPF } from "cpf";
import { v4 as uuidv4 } from "uuid";
import { generateLicensePlate } from "../generate-license-plate.js";
import { deleteOrder } from "../../../domain/use-cases/order/delete-order.js";
import { OrderStatus } from "../../../domain/models/order.js";

describe("Delete order", () => {

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
        const carId = car.id;

        const datetimeNow = Date.now();
        const randomCpf = generateCPF().replace(/\D/g, "");
        const createClientData: CreateClientDTO = {
            name: "Ryan",
            birthDate: "2002-07-24",
            cpf: randomCpf,
            email: datetimeNow+ "@gmail.com",
            phone: "+5511976543210"
        }

        const client = await createClient.exec(createClientData);
        const clientId = client.id;

        const createOrderData: CreateOrderDTO = {
            clientId,
            carId
        }

        const order = await createOrder.exec(createOrderData);
        idToDelete = order.id;
    });

    test("Should delete an order successfully", async () => {
        const order = await deleteOrder.exec(idToDelete);

        expect(order.status).toBe(OrderStatus.Canceled);
    });

    test("Should not allow delete an order with wrong id", async () => {
        const randomUUID = uuidv4();

        await expect(deleteOrder.exec(randomUUID)).rejects.toThrow(
            "order not found."
        );
    });

});