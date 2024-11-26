import { CarDTO } from "../../dtos/car/car-dto.js";

export interface FindOneCar {
    exec(data: string): Promise<CarDTO>
} 
