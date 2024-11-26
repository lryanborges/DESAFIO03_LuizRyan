import "reflect-metadata"
import { DataSource } from "typeorm"
import User from "../domain/models/user.js"
import { env } from "../framework/express/lib/env.js"
import CarItem from "../domain/models/car-item.js"
import Car from "../domain/models/car.js"
import Order from "../domain/models/order.js"
import Client from "../domain/models/client.js"


export const PostgresDataSource = new DataSource({
    type: "postgres",
    host: env().DB_HOST,
    port: env().DB_PORT,
    username: env().DB_USERNAME,
    password: env().DB_PASSWORD,
    database: env().DB_NAME,
    synchronize: false,
    logging: true,
    migrationsRun: false,
    entities: [User, Car, CarItem, Order, Client],
    migrations: !env().NODE_ENV ? ["migrations/**.ts"] : []
})
