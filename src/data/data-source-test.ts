import { env } from "../framework/express/lib/env.js";
import { PostgresDataSourceTest } from "./postgres-test.js";

export const datasource = ({
    "postgres": PostgresDataSourceTest
})[env()?.DB_DRIVER ?? "postgres"]
