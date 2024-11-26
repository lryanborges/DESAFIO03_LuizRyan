/*eslint-disable no-console*/
import { LogProvider } from "../types.js"

export class DevelopmentLog implements LogProvider{
    info<T>(data: T): void {
        console.info(data)
    }
    error(err: Error): void {
        console.error(err)
    }
    fatal(err: Error): void {
        console.error(err)
    }
    warn(err: Error): void {
        console.warn(err)
    }
}
