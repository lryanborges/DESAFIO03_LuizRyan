import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm"
import CarItem from "./car-item.js"

enum Status {
    Active = "ativo",
    Inactive = "inativo",
    Excluded = "excluído"
}

@Entity("cars")
export default class Car {

    constructor(
        licensePlate: string,
        brand: string,
        model: string,
        km: number,
        year: number,
        price: number,
        status: Status
    ) {
        this.licensePlate = licensePlate
        this.brand = brand
        this.model = model
        this.km = km
        this.year = year
        this.price = price
        this.status = status
        this.createdAt = new Date()
    }

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    licensePlate: string

    @Column()
    brand: string

    @Column()
    model: string

    @Column({ type: "float", nullable: true })
    km: number

    @Column({ type: "int" })
    year: number

    @OneToMany(() => CarItem, car_items => car_items.car)
    carItems: CarItem[]

    @Column({ type: "float" })
    price: number

    @Column({ type: "enum", enum: Status })
    status: string

    @CreateDateColumn()
    createdAt: Date

}
