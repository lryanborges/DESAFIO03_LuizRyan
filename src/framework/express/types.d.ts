import { Router, Request, Response, NextFunction } from "express"

export type NODE_ENV_OPTIONS = "development" | "production" | "test"

export interface Env {
    JWT_SECRET: string
    DB_DRIVER?: string
    DB_HOST: string
    DB_PORT: number
    DB_USERNAME: string
    DB_PASSWORD: string
    DB_NAME: string
    CORS_ORIGIN: string
    NODE_ENV: NODE_ENV_OPTIONS
    PORT: number
}

export interface RouterDescriptor {
    path: string,
    router: Router
}

export interface ExpressHandler {
    (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> | void
}

export interface ExpressErrorHandler<T> {
    (
        error: T,
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> | void
}

export interface LogProvider {
    error(err: Error): void
    fatal(err: Error): void
    warn(err: Error): void
    info<T>(data: T): void
}

export interface RouterDescriptior {
    path: string,
    router: Router
}
