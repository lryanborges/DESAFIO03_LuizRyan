import "reflect-metadata"
import { DataSource } from "typeorm"
import User from "../domain/models/user.js"
import { env } from "../framework/express/lib/env.js"
import CarItem from "../domain/models/car-item.js"
import Car from "../domain/models/car.js"
import Order from "../domain/models/order.js"
import Client from "../domain/models/client.js"

export const PostgresDataSourceTest = new DataSource({
    type: "postgres",
    host: "127.0.0.1",  // Ou o IP do contêiner, se necessário
    port: 3001,         // Porta mapeada no Docker
    username: "test",   // Nome de usuário configurado no Docker
    password: "test",   // Senha configurada no Docker
    database: "test",   // Nome do banco de dados configurado no Docker
    synchronize: false,
    logging: true,
    migrationsRun: false,
    entities: [User, Car, CarItem, Order, Client],
    migrations: !env().NODE_ENV ? ["migrations/**.ts"] : []
  });
  