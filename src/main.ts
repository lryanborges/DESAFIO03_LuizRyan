import "reflect-metadata"
import { server } from "./server.js"
import { env } from "./framework/express/lib/env.js"
import { Log } from "./framework/express/lib/log.js"
import { PostgresDataSource } from "./data/postgres.js"

PostgresDataSource
    .initialize()
    .then(() => {
        Log.info("Database is connected!!!")
    })
    .catch((err) => {
        Log.error(err)
    })

server()
    .listen(env().PORT, () => {
        Log.info(`Server is listen on port ${env().PORT}!!!`)
    })
