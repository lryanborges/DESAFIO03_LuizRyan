import { findManyCar } from "../../../domain/use-cases/car/find-many-car.js";

describe("Find many car", () => {
    test("Should list all cars with default pagination", async () => {
        const listCars = await findManyCar.exec({});

        const totalPages = Math.ceil(listCars.total / 10);

        expect(listCars.data.length).toBeGreaterThan(0);
        expect(listCars.currentPage).toBe(1)
        expect(listCars.pages).toBe(totalPages)
        expect(listCars.data.at(0)).toHaveProperty("brand");
    });

    test("Shoud list all cars with specific model", async () => {
        const listCars = await findManyCar.exec({model: "Model", limit: 1000});

        for(let i = 0; i < listCars.data.length; i++){
            expect(listCars.data.at(i).model).toBe("Model");
        }
    });

    test("Shoud list all cars with specific year gap", async () => {
        const listCars = await findManyCar.exec({fromYear: 2017, untilYear: 2022, limit: 1000});

        for(let i = 0; i < listCars.data.length; i++){
            const car = listCars.data.at(i);

            expect(car.year).toBeGreaterThan(2016);
            expect(car.year).toBeLessThan(2023);
        }
    });

    test("Shoud list all cars with specific license plate end and brand", async () => {
        const listCars = await findManyCar.exec({licensePlateEnd: "34", brand: "Brand", limit: 1000});

        for(let i = 0; i < listCars.data.length; i++){
            const car = listCars.data.at(i);

            const licensePlateEnd = car.licensePlate.slice(-2);
            expect(licensePlateEnd).toBe("34");
            expect(car.brand).toBe("Brand");
        }
    });

    test("Shoud list all cars with less than 20000 Km", async () => {
        const listCars = await findManyCar.exec({km: 20000, limit: 1000});

        for(let i = 0; i < listCars.data.length; i++){
            expect(listCars.data.at(i).km).toBeLessThan(20001);
        }
    });

    test("Shoud list all cars with price between 50000 and 200000", async () => {
        const listCars = await findManyCar.exec({minPrice: 50000, maxPrice: 200000, limit: 1000});

        for(let i = 0; i < listCars.data.length; i++){
            const car = listCars.data.at(i);
            expect(car.price).toBeGreaterThan(49999)
            expect(car.price).toBeLessThan(200001);
        }
    });

});