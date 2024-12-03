import { CreateOrderDTO } from "./../../../domain/interfaces/dtos/order/create-order-dto.js";
import { CreateCarDTO } from "../../../domain/interfaces/dtos/car/create-car-dto.js";
import { CreateClientDTO } from "../../../domain/interfaces/dtos/client/create-client-dto.js";
import { createCar } from "../../../domain/use-cases/car/create-car.js";
import { createClient } from "../../../domain/use-cases/client/create-client.js";
import { generateLicensePlate } from "../generate-license-plate.js";
import { generate as generateCPF } from "cpf";
import { createOrder } from "../../../domain/use-cases/order/create-order.js";
import { v4 as uuidv4 } from "uuid";
import { findManyCar } from "../../../domain/use-cases/car/find-many-car.js";

describe("Create order", () => {

    let carId;
    let clientId;
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
        carId = car.id;

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
        clientId = client.id;
    });

    test("Should create a order successfully", async () => {
        const createOrderData: CreateOrderDTO = {
            clientId,
            carId
        }

        const order = await createOrder.exec(createOrderData);

        expect(order).toHaveProperty("id");
        expect(order).toHaveProperty("client");
        expect(order).toHaveProperty("car");
        expect(order).toHaveProperty("createdAt");
    });

    test("Should not allow to create a new order with a wrong car id", async () => {
        const randomUUID = uuidv4();

        const createOrderData: CreateOrderDTO = {
            clientId,
            carId: randomUUID
        }

        await expect(createOrder.exec(createOrderData)).rejects.toThrow(
            "car not found."
        );
    });

    test("Should not allow to create a new order with a wrong client id", async () => {
        const randomUUID = uuidv4();

        const createOrderData: CreateOrderDTO = {
            clientId: randomUUID,
            carId
        }

        await expect(createOrder.exec(createOrderData)).rejects.toThrow(
            "client not found."
        );
    });

    test("Should not allow to create a order with an using car id", async () => {
        const usingCar = await findManyCar.exec( { licensePlateEnd: "ABD1234" } );
        const usingCarId = usingCar.data.at(0).id;

        const createOrderData: CreateOrderDTO = {
            clientId,
            carId: usingCarId
        }

        await expect(createOrder.exec(createOrderData)).rejects.toThrow(
            "there is already a order with this data"
        );
    });

});