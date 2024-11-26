
export interface ClientDTO {
    id: string
    name: string
    birthDate: Date
    cpf: string
    email: string
    phone: string
    createdAt: Date
    excludedAt: Date | null
}
