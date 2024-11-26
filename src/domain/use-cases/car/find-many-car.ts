import { CarDTO, Status } from "../../interfaces/dtos/car/car-dto.js"
import { QueryCarDTO } from "../../interfaces/dtos/car/query-car-dto.js"
import { ListResponse } from "../../interfaces/dtos/list-response-dto.js"
import { FindManyCar } from "../../interfaces/use-cases/car/find-many-car.js"
import { carRepository } from "../../repositories/car-repository.js"

export const findManyCar = new class implements FindManyCar{
    public async exec(queryParams: QueryCarDTO): Promise<ListResponse<CarDTO>> {
       
        const { 
            page = 1, 
            limit = 10, 
            order = "year", 
            orderDirection = "ASC", 
            status, 
            licensePlateEnd, 
            brand, 
            model, 
            items, 
            km, 
            fromYear, 
            untilYear, 
            minPrice, 
            maxPrice 
        } = queryParams

        const queryBuilder = carRepository.createQueryBuilder("car").leftJoinAndSelect("car.carItems", "carItem")

        if (status) {
            queryBuilder.andWhere("car.status = :status", { status })
        }

        if (licensePlateEnd) {
            queryBuilder.andWhere("car.licensePlate LIKE :licensePlateEnd", { licensePlateEnd: `%${licensePlateEnd}` })
        }

        if (brand) {
            queryBuilder.andWhere("car.brand = :brand", { brand })
        }

        if (model) {
            queryBuilder.andWhere("car.model = :model", { model })
        }

        if (items && items.length > 0 && items.length <= 5) {
            queryBuilder.andWhere("carItem.name IN (:...items)", { items })
        }

        if (km !== undefined) {
            queryBuilder.andWhere("car.km <= :km", { km })
        }

        if (fromYear && untilYear) {
            queryBuilder.andWhere("car.year BETWEEN :fromYear AND :untilYear", { fromYear, untilYear })
        } else if (fromYear) {
            queryBuilder.andWhere("car.year >= :fromYear", { fromYear })
        } else if (untilYear) {
            queryBuilder.andWhere("car.year <= :untilYear", { untilYear })
        }

        if (minPrice && maxPrice) {
            queryBuilder.andWhere("car.price BETWEEN :minPrice AND :maxPrice", { minPrice, maxPrice })
        } else if (minPrice) {
            queryBuilder.andWhere("car.price >= :minPrice", { minPrice })
        } else if (maxPrice) {
            queryBuilder.andWhere("car.price <= :maxPrice", { maxPrice })
        }

        queryBuilder
            .orderBy(`car.${order}`, orderDirection as "ASC" | "DESC")
            .skip((page - 1) * limit)
            .take(limit)

        const [cars, total] = await queryBuilder.getManyAndCount()


        const carsDTO = cars.map(car => ({
            id: car.id,
            status: car.status as Status,
            licensePlate: car.licensePlate,
            brand: car.brand,
            model: car.model,
            km: car.km,
            year: car.year,
            items: car.carItems.map(item => item.name), 
            price: car.price,
            createdAt: car.createdAt
        }))


        const response: ListResponse<CarDTO> = {
            total,
            currentPage: page,
            pages: Math.ceil(total / limit),
            data: carsDTO
        }

        return response

    }
}
