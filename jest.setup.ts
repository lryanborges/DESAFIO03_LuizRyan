import { PostgresDataSource } from "./src/data/postgres";

beforeAll(async () => {
    // Inicializa o DataSource (conexão com o banco de dados)
    await PostgresDataSource.initialize();
});

afterAll(async () => {
    // Encerra a conexão com o banco de dados após os testes
    await PostgresDataSource.destroy();
});