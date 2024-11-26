import { LogProvider } from "../types.js"
/*eslint-disable no-console*/

export class FakeProductionLog implements LogProvider{
    error(_: Error): void {}
    info<T>(data: T): void {
        console.info(data)
    }
    fatal(_: Error): void {}
    warn(_: Error): void {}
}
