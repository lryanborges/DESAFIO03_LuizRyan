import { EnvNotFoundError } from "../exceptions/env-not-found-error.js"
import "dotenv/config"
import { Env } from "../types.js"

const _env = process.env as Partial<Env>

if (!_env.DB_HOST) throw new EnvNotFoundError("DB_HOST")
if (!_env.JWT_SECRET) throw new EnvNotFoundError("JWT_SECRET")
if (!_env.DB_PORT) throw new EnvNotFoundError("DB_PORT")
if (!_env.DB_USERNAME) throw new EnvNotFoundError("DB_USERNAME")
if (!_env.DB_PASSWORD) throw new EnvNotFoundError("DB_PASSWORD")
if (!_env.DB_NAME) throw new EnvNotFoundError("DB_NAME")
if (!_env.CORS_ORIGIN) throw new EnvNotFoundError("CORS_ORIGIN")
if (!_env.PORT) throw new EnvNotFoundError("PORT")

const variables: Env = {
    ..._env as Env,
    PORT: parseInt(process.env.PORT as string),
    DB_PORT: parseInt(process.env.DB_PORT as string)
}

export function env() {
    return variables
}
