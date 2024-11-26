
export interface FindOneOrderDTO {
    id: string
    status: string
    createdAt: string
    startDate: string
    endDate: string
    totalValue: number
    cep: string
    city: string
    uf: string
    client: {
        id: string
        name: string
        email: string
        cpf: string
    }
    car: {
        id: string
        brand: string
        model: string
        year: number
        km: number
        items: string[]
        licensePlate: string
    }
}
