import { UpdateCarDTO } from "../../dtos/car/update-car-dto.js";

export interface UpdateCar {
    exec(id: string, data: UpdateCarDTO): Promise<void>
}
