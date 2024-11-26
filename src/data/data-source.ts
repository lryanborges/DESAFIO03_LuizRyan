import { env } from "../framework/express/lib/env.js"
import { PostgresDataSource } from "./postgres.js"

export const datasource = ({
    "postgres": PostgresDataSource
})[env()?.DB_DRIVER ?? "postgres"]
