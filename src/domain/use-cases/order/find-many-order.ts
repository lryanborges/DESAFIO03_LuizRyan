import { FindManyOrderDTO } from "../../interfaces/dtos/order/find-many-order-dto.js"
import { QueryOrderDTO } from "../../interfaces/dtos/order/query-order-dto.js"
import { FindManyOrder } from "../../interfaces/use-cases/order/find-many-order.js"
import { orderRepository } from "../../repositories/order-repository.js"
import { ListResponse } from "../../interfaces/dtos/list-response-dto.js"

export const findManyOrder = new class implements FindManyOrder {
    public async exec(queryParams: QueryOrderDTO): Promise<ListResponse<FindManyOrderDTO>> {
        const {
            page = 1,
            limit = 10,
            status,
            cpf,
            startDate,
            endDate,
            order = "createdAt",
            orderDirection = "ASC"
        } = queryParams;


        const queryBuilder = orderRepository.createQueryBuilder("order")
            .leftJoinAndSelect("order.client", "client");

        if (status) {
            queryBuilder.andWhere("order.status = :status", { status });
        }

        if (cpf) {
            queryBuilder.andWhere("client.cpf = :cpf", { cpf });
        }

        if (startDate && endDate) {
            queryBuilder.andWhere("order.createdAt BETWEEN :startDate AND :endDate", { startDate, endDate });
        } else if (startDate) {
            queryBuilder.andWhere("order.createdAt >= :startDate", { startDate });
        } else if (endDate) {
            queryBuilder.andWhere("order.createdAt <= :endDate", { endDate });
        }

        queryBuilder
            .orderBy(`order.${order}`, orderDirection as "ASC" | "DESC")
            .skip((page - 1) * limit)
            .take(limit);

        const [orders, total] = await queryBuilder.getManyAndCount();

        const ordersDTO = orders.map(order => ({
            id: order.id,
            status: order.status,
            createdAt: order.createdAt,
            endDate: order.concludedAt,
            excludedAt: order.excludedAt,
            totalValue: order.totalValue,
            cep: order.cep,
            city: order.city,
            uf: order.uf,
            client: {
                id: order.client.id,
                name: order.client.name,
                cpf: order.client.cpf
            }
        }));

        const response: ListResponse<FindManyOrderDTO> = {
            total,
            currentPage: page,
            pages: Math.ceil(total / limit),
            data: ordersDTO
        };

        return response;
    }
}
