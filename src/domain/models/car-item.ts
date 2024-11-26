import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm"
import Car from "./car.js"

@Entity("cars_items")
export default class CarItem {

    constructor(
        name: string,
        car: Car
    ) {
        this.name = name
        this.car = car
        this.createdAt = new Date() 
    }

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string
  
    @ManyToOne(() => Car, car => car.carItems)
    @JoinColumn({ name: "carId" })
    car: Car
  
    @CreateDateColumn()
    createdAt: Date

}
