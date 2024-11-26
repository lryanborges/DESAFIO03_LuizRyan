export interface ListResponse<T> {
    total: number;
    currentPage: number;
    pages: number;
    data: T[];
}
