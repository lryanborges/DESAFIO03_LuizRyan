import { PostgresDataSource } from "./src/data/postgres";

beforeAll(async () => {
    if (!PostgresDataSource.isInitialized) {
        await PostgresDataSource.initialize();
    }
});

afterAll(async () => {
    if (PostgresDataSource.isInitialized) {
        await PostgresDataSource.destroy();
    }
});
