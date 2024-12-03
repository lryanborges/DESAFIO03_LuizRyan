import { CreateCarDTO } from "../../../domain/interfaces/dtos/car/create-car-dto.js";
import { CreateClientDTO } from "../../../domain/interfaces/dtos/client/create-client-dto.js";
import { CreateOrderDTO } from "../../../domain/interfaces/dtos/order/create-order-dto.js";
import { OrderStatus } from "../../../domain/models/order.js";
import { createCar } from "../../../domain/use-cases/car/create-car.js";
import { createClient } from "../../../domain/use-cases/client/create-client.js";
import { createOrder } from "../../../domain/use-cases/order/create-order.js";
import { updateOrder } from "../../../domain/use-cases/order/update-order.js";
import { generateLicensePlate } from "../generate-license-plate.js";
import { UpdateOrderDTO } from "./../../../domain/interfaces/dtos/order/update-order-dto.js";
import { generate as generateCPF } from "cpf";
import { v4 as uuidv4 } from "uuid";

describe("Update order", () => {

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
        idToUpdate = order.id;
    });

    test("Should update an order successfully", async () => {
        const updateOrderData: UpdateOrderDTO = {
            cep: "69907540",
            status: OrderStatus.Approved,
            cpf: generateCPF().replace(/\D/g, "")
        }

        const order = await updateOrder.exec(idToUpdate, updateOrderData)

        expect(order).toHaveProperty("id");
        expect(order.cep).toBe("69907540");
        expect(order.status).toBe(OrderStatus.Approved);
    });

    test("Should not allow update an order with wrong id", async () => {
        const randomUUID = uuidv4();

        const updateOrderData: UpdateOrderDTO = {
            cep: "69907540",
            status: OrderStatus.Approved,
            cpf: generateCPF().replace(/\D/g, "")
        }

        await expect(updateOrder.exec(randomUUID, updateOrderData)).rejects.toThrow(
            "order not found."
        );     
    });

});