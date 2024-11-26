
export const invalidData = () => ({
    "description": "Dados inválidos ou campos obrigatórios ausentes.",
    "content": {
        "application/json": {
            "schema": {
                "type": "object",
                "properties": {
                    "message": {
                        "type": "string",
                        "example": "Os dados fornecidos são inválidos ou incompletos."
                    },
                    "errors": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "example": "O campo 'email' é obrigatório."
                        }
                    }
                }
            }
        }
    }
})
