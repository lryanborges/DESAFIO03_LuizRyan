export interface FindManyOrderDTO {
    id: string;
    status: Status;
    createdAt: Date;
    endDate?: Date;
    excludedAt?: Date; 
    totalValue: number;
    cep: string;
    city: string;
    uf: string;
    client: {
        id: string;
        name: string;
        cpf: string;
    };
}
