import { CreateCarDTO } from "../../dtos/car/create-car-dto.js";

export interface CreateCar {
    exec(data: CreateCarDTO): Promise<void>
} 
