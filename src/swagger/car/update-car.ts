
export const updateCar = {
    "openapi": "3.0.0",
    "info": {
        "title": "API de Atualização de Carro",
        "version": "1.0.0"
    },
    "paths": {
        "/car/{id}": {
            "patch": {
                "security": [
                    {
                        "BearerAuth": []
                    }
                ],
                "tags": ["Cars"],
                "summary": "Atualiza as informações de um carro existente",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "ID do carro a ser atualizado",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/UpdateCar"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Carro atualizado com sucesso"
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
                                                "type": "string",
                                                "example": "The price is required"
                                            }
                                        }
                                    }
                                }
                            }
                        }
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
            "UpdateCar": {
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
                        "enum": ["ativo", "inativo"],
                        "description": "Status of the car"
                    }
                }
            },
            "Car": {
                "type": "object",
                "properties": {
                    "licensePlate": {
                        "type": "string"
                    },
                    "brand": {
                        "type": "string"
                    },
                    "model": {
                        "type": "string"
                    },
                    "km": {
                        "type": "number"
                    },
                    "year": {
                        "type": "integer"
                    },
                    "items": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "example": "nefun"
                        }
                    },
                    "price": {
                        "type": "number"
                    },
                    "status": {
                        "type": "string",
                        "enum": ["ativo", "inativo"]
                    }
                }
            }
        }
    }
}

