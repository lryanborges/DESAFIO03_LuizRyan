
export const createCar = {
    "paths": {
        "/car": {
            "post": {
                "tags": ["Cars"],
                "summary": "Criar um novo carro",
                "security": [
                    {
                        "BearerAuth": []
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "licensePlate": {
                                        "type": "string",
                                        "description": "License plate of the car",
                                        "example": "ABC1234"
                                    },
                                    "brand": {
                                        "type": "string",
                                        "description": "Brand of the car",
                                        "example": "Toyota"
                                    },
                                    "model": {
                                        "type": "string",
                                        "description": "Model of the car",
                                        "example": "Corolla"
                                    },
                                    "km": {
                                        "type": "number",
                                        "description": "Mileage of the car",
                                        "example": 15000
                                    },
                                    "year": {
                                        "type": "integer",
                                        "description": "Year of manufacture (not more than 11 years old)",
                                        "example": 2020
                                    },
                                    "items": {
                                        "type": "array",
                                        "maxItems": 5,
                                        "items": {
                                            "type": "string"
                                        },
                                        "description": "List of items (max 5, unique)",
                                        "example": ["Air Conditioning", "Navigation System"]
                                    },
                                    "price": {
                                        "type": "number",
                                        "format": "float",
                                        "description": "Price of the car",
                                        "example": 75000.50
                                    },
                                    "status": {
                                        "type": "string",
                                        "enum": ["ativo", "inativo", "excluído"],
                                        "description": "Status of the car"
                                    }
                                },
                                "required": ["id", "licensePlate", "brand", "model", "year", "items", "price", "status"]
                            }
                        }
                    }
                },
                "responses": {
                    "201": {
                        "description": "Carro criado com sucesso"
                    },
                    "422": {
                        "description": "Dados inválidos ou campos obrigatórios ausentes.",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "errors": {
                                            "type": "array",
                                            "items": {
                                                "type": "object",
                                                "properties": {
                                                    "field": {
                                                        "type": "string",
                                                        "example": "licensePlate"
                                                    },
                                                    "message": {
                                                        "type": "string",
                                                        "example": "Required"
                                                    }
                                                },
                                                "required": ["field", "message"]
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Carro já existe com a mesma placa e status ativo ou inativo."
                    }
                }
            }
        }
    }
}
