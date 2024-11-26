

export interface Parser<T> {
    parse(data: T): T
}
