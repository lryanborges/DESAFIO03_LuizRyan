import { ClientDTO } from "../../interfaces/dtos/client/client-dto.js"
import { QueryClientDTO } from "../../interfaces/dtos/client/query-client-dto.js"
import { FindManyClient, ListClientResponse } from "../../interfaces/use-cases/client/find-many-client.js"
import { clientRepository } from "../../repositories/client-repository.js"

export const findManyClient = new class implements FindManyClient {
    async exec(queryParams: QueryClientDTO): Promise<ListClientResponse> {
        const { 
            name, 
            email, 
            cpf, 
            excludedAt, 
            orderBy = "createdAt", 
            orderDirection = "ASC", 
            page = 1, 
            limit = 10 
        } = queryParams;

        const queryBuilder = clientRepository.createQueryBuilder("client");

        if (name) {
            queryBuilder.andWhere("client.name LIKE :name", { name: `%${name}%` });
        }

        if (email) {
            queryBuilder.andWhere("client.email LIKE :email", { email: `%${email}%` });
        }

        if (cpf) {
            queryBuilder.andWhere("client.cpf = :cpf", { cpf });
        }

        if (excludedAt) {
            queryBuilder.andWhere("DATE(client.excludedAt) = :excludedAt", { excludedAt });
        }

        queryBuilder
            .orderBy(`client.${orderBy}`, orderDirection as "ASC" | "DESC")
            .skip((page - 1) * limit)
            .take(limit)

        const [clients, total] = await queryBuilder.getManyAndCount();

        const clientsDTO: ClientDTO[] = clients.map(client => ({
            id: client.id,
            name: client.name,
            birthDate: client.birthDate,
            email: client.email,
            phone: client.phone,
            cpf: client.cpf,
            excludedAt: client.excludedAt,
            createdAt: client.createdAt
        }))

        const response: ListClientResponse = {
            total,
            currentPage: page,
            pages: Math.ceil(total / limit),
            data: clientsDTO
        };

        return response;
    }
}
