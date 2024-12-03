import { OrderStatus } from "../../../domain/models/order.js";
import { findManyOrder } from "../../../domain/use-cases/order/find-many-order.js";

describe("Find many order", () => {
    test("Should list all orders with default pagination", async () => {
        const listOrders = await findManyOrder.exec({});

        const totalPages = Math.ceil(listOrders.total / 10);

        expect(listOrders.data.length).toBeGreaterThan(0);
        expect(listOrders.currentPage).toBe(1)
        expect(listOrders.pages).toBe(totalPages)
        expect(listOrders.data.at(0)).toHaveProperty("cep");
    });

    test("Should list all orders with specific status", async () => {
        const listOrders = await findManyOrder.exec( { status: OrderStatus.Approved } );

        for(let i = 0; i < listOrders.data.length; i++) {
            expect(listOrders.data.at(i).status).toBe(OrderStatus.Approved);
        }

    });

    test("Should list all orders between two dates", async () => {
        const startDate = new Date("2024-01-01").toISOString();
        const endDate = new Date("2024-12-31").toISOString();  
    
        const listOrders = await findManyOrder.exec({ startDate, endDate });
    
        for (let i = 0; i < listOrders.data.length; i++) {
            const orderDate = new Date(listOrders.data.at(i).createdAt).getTime();
            expect(orderDate).toBeGreaterThanOrEqual(new Date(startDate).getTime());
            expect(orderDate).toBeLessThanOrEqual(new Date(endDate).getTime());
        }
    });

    test("Should list all orders from a specific start date", async () => {
        const startDate = new Date("2024-06-01").toISOString();
    
        const listOrders = await findManyOrder.exec({ startDate });
    
        for (let i = 0; i < listOrders.data.length; i++) {
            const orderDate = new Date(listOrders.data.at(i).createdAt).getTime();
            expect(orderDate).toBeGreaterThanOrEqual(new Date(startDate).getTime());
        }
    });

    test("Should list all orders up to a specific end date", async () => {
        const endDate = new Date("2024-06-01").toISOString();
    
        const listOrders = await findManyOrder.exec({ endDate });
    
        for (let i = 0; i < listOrders.data.length; i++) {
            const orderDate = new Date(listOrders.data.at(i).createdAt).getTime();
            expect(orderDate).toBeLessThanOrEqual(new Date(endDate).getTime());
        }
    });
});