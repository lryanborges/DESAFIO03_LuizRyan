enum Status {
    Active = "ativo",
    Inactive = "inativo",
    Deleted = "excluído"
}

export interface CarDTO {
    id: string
    status: Status
    licensePlate: string
    brand: string
    model: string
    km: number
    year: number
    items: string[]
    price: number
    createdAt: Date
}
