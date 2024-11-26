import { ListResponse } from "../../interfaces/dtos/list-response-dto.js"
import { QueryUserDTO } from "../../interfaces/dtos/user/query-user-dto.js"
import { UserDTO } from "../../interfaces/dtos/user/user-dto.js"
import { FindManyUser } from "../../interfaces/use-cases/user/find-many-user.js"
import { userRepository } from "../../repositories/user-repository.js"

export const findManyUser = new class implements FindManyUser {
    async exec(queryParams: QueryUserDTO): Promise<ListResponse<UserDTO>> {
        const { 
            page = 1, 
            limit = 10, 
            order = "name", 
            orderDirection = "ASC", 
            name, 
            email, 
            excludedAt 
        } = queryParams

        const queryBuilder = userRepository.createQueryBuilder("user")

        if (name) {
            queryBuilder.andWhere("user.name LIKE :name", { name: `%${name}%` })
        }

        if (email) {
            queryBuilder.andWhere("user.email LIKE :email", { email: `%${email}%` })
        }

        if (excludedAt) {
            queryBuilder.andWhere("DATE(user.excludedAt) = :excludedAt", { excludedAt });
        }        

        queryBuilder
            .orderBy(`user.${order}`, orderDirection as "ASC" | "DESC")
            .skip((page - 1) * limit)
            .take(limit)

        const [users, total] = await queryBuilder.getManyAndCount()

        const usersDTO: UserDTO[] = users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            excludedAt: user.excludedAt
        }))

        const response: ListResponse<UserDTO> = {
            total,
            currentPage: page,
            pages: Math.ceil(total / limit),
            data: usersDTO
        }

        return response
    }
}
