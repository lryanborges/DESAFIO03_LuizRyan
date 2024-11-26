
export const deleteCar = {
    "paths": {
        "/car/{id}": {
            "delete": {
                "security": [
                    {
                        "BearerAuth": []
                    }
                ],
                "tags": ["Cars"],
                "summary": "Exclui um carro existente (soft delete)",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "ID do carro a ser excluído",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Carro excluído com sucesso"
                    },
                    "404": {
                        "description": "Carro inexistente"
                    }
                }
            }
        }
    },
    "components": {
        "schemas": {
            "SuccessResponse": {
                "type": "object",
                "properties": {
                    "message": {
                        "type": "string",
                        "example": "Carro excluído com sucesso."
                    }
                }
            },
            "Error": {
                "type": "object",
                "properties": {
                    "message": {
                        "type": "string"
                    },
                    "code": {
                        "type": "integer"
                    }
                }
            }
        }
    }
}

