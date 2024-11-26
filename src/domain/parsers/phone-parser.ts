import parsePhoneNumberFromString from "libphonenumber-js"
import { z } from "zod"

export const phoneParser = z.string().refine((value) => {
    const phoneNumber = parsePhoneNumberFromString(value)
    return phoneNumber && phoneNumber.isValid()
}, {
    message: "Invalid phone number"
})
