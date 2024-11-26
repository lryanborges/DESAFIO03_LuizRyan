import { NODE_ENV_OPTIONS } from "../types.js"
import { DevelopmentLog } from "./development-log.js"
import { env } from "./env.js"
import { FakeProductionLog } from "./production-log.js"


class LogFactory {
    static create(env: NODE_ENV_OPTIONS) {
        const provider = env === "production" ?
            new FakeProductionLog()
            :
            new DevelopmentLog()
        return provider
    }
}

export const Log = LogFactory.create(env().NODE_ENV)
