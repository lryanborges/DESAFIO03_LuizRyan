
export const findOneCar = {
    "paths": {
        "/car/{id}": {
            "get": {
                "tags": ["Cars"],
                "summary": "Visualizar um carro pelo ID",
                "security": [
                    {
                        "BearerAuth": []
                    }
                ],
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "Identificador único do carro",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Detalhes do carro recuperados com sucesso",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/CarResponse"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Carro não encontrado"
                    }
                }
            }
        }
    },
    "components": {
        "schemas": {
            "CarResponse": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "format": "uuid",
                        "description": "Identificador único do carro"
                    },
                    "licensePlate": {
                        "type": "string",
                        "description": "Placa do carro",
                        "example": "ABC-1234"
                    },
                    "brand": {
                        "type": "string",
                        "description": "Marca do carro",
                        "example": "Toyota"
                    },
                    "model": {
                        "type": "string",
                        "description": "Modelo do carro",
                        "example": "Corolla"
                    },
                    "km": {
                        "type": "number",
                        "description": "Quilometragem do carro",
                        "example": 15000
                    },
                    "year": {
                        "type": "integer",
                        "description": "Ano de fabricação",
                        "example": 2020
                    },
                    "items": {
                        "type": "array",
                        "items": {
                            "type": "string"
                        },
                        "description": "Lista de itens associados ao carro",
                        "example": ["Ar condicionado", "Sistema de navegação"]
                    },
                    "price": {
                        "type": "number",
                        "format": "float",
                        "description": "Preço do carro",
                        "example": 75000.50
                    },
                    "createdAt": {
                        "type": "string",
                        "format": "date-time",
                        "description": "Data e hora em que o carro foi cadastrado",
                        "example": "2024-11-03T12:00:00Z"
                    },
                    "status": {
                        "type": "string",
                        "enum": ["ativo", "inativo", "excluído"],
                        "description": "Status do carro"
                    }
                }
            }
        }
    }
}
