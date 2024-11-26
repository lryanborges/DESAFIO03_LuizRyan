import { DataSource } from "typeorm"

export interface Connection {
    connect(): DataSource
}
