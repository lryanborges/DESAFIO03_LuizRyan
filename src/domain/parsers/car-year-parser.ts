import { z } from "zod"

const nextYear = () => new Date().getFullYear() + 1

export const carYearParser = z.number().refine(
    (year) => {
        return year <= nextYear() && year >= nextYear() - 11
    },
    (year) => ({
        message: `O ano ${year} é inválido. Deve estar entre ${nextYear() - 11} e ${nextYear()}.`
    })
)
