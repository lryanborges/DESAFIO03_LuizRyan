export const findManyCar = {
    "paths": {
        "/car": {
            "get": {
                "tags": ["Cars"],
                "summary": "Listar carros",
                "security": [
                    {
                        "BearerAuth": []
                    }
                ],
                "parameters": [
                    {
                        "name": "status",
                        "in": "query",
                        "required": false,
                        "description": "Status do carro (ativo ou inativo)",
                        "schema": {
                            "type": "string",
                            "enum": ["ativo", "inativo"]
                        }
                    },
                    {
                        "name": "licensePlateEnd",
                        "in": "query",
                        "required": false,
                        "description": "Caracteres finais da placa",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "brand",
                        "in": "query",
                        "required": false,
                        "description": "Marca exata do carro",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "model",
                        "in": "query",
                        "required": false,
                        "description": "Modelo exato do carro",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "items",
                        "in": "query",
                        "required": false,
                        "description": "Lista de até 5 itens exatos (máximo 5, únicos), separados por vírgula",
                        "schema": {
                            "type": "string",
                            "example": "Ar%20Condicionado,Seis%20Bancos"
                        }
                    },                                    
                    {
                        "name": "km",
                        "in": "query",
                        "required": false,
                        "description": "Filtrar carros com quilometragem menor ou igual a este valor",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "fromYear",
                        "in": "query",
                        "required": false,
                        "description": "Ano inicial para o filtro de carro",
                        "schema": {
                            "type": "integer"
                        }
                    },
                    {
                        "name": "untilYear",
                        "in": "query",
                        "required": false,
                        "description": "Ano final para o filtro de carro",
                        "schema": {
                            "type": "integer"
                        }
                    },
                    {
                        "name": "minPrice",
                        "in": "query",
                        "required": false,
                        "description": "Preço mínimo para o filtro de carro",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "maxPrice",
                        "in": "query",
                        "required": false,
                        "description": "Preço máximo para o filtro de carro",
                        "schema": {
                            "type": "number"
                        }
                    },
                    {
                        "name": "page",
                        "in": "query",
                        "required": false,
                        "description": "Número da página para paginação",
                        "schema": {
                            "type": "integer",
                            "default": 1
                        }
                    },
                    {
                        "name": "limit",
                        "in": "query",
                        "required": false,
                        "description": "Tamanho máximo da list de carros retornada",
                        "schema": {
                            "type": "integer",
                            "default": 10
                        }
                    },
                    {
                        "name": "order",
                        "in": "query",
                        "schema": {
                            "type": "enum",
                            "enum": ["price", "year", "km"],
                            "example": "price",
                            "default": "year"
                        },
                        "description": "Campos para ordenação da lista"
                    },
                    {
                        "name": "orderDirection",
                        "in": "query",
                        "schema": {
                            "type": "enum",
                            "enum": ["ASC", "DESC"],
                            "example": "ASC",
                            "default": "ASC"
                        },
                        "description": "Campos para escolha da ordenação da lista"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Lista de carros recuperada com sucesso",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/CarsListResponse"
                                }
                            }
                        }
                    },
                    "204": {
                        "description": "Requisição bem sucedida porém nenhum carro encontrado"
                    }
                }
            }
        }
    },
    "components": {
        "schemas": {
            "CarsListResponse": {
                "type": "object",
                "properties": {
                    "total": {
                        "type": "integer",
                        "description": "Número total de carros disponíveis"
                    },
                    "currentPage": {
                        "type": "integer",
                        "description": "Número da página atual"
                    },
                    "pages": {
                        "type": "integer",
                        "description": "Número total de páginas"
                    },
                    "data": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "id": {
                                    "type": "string",
                                    "format": "uuid",
                                    "description": "Identificador único do carro"
                                },
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
                                    "uniqueItems": true,
                                    "items": {
                                        "type": "string"
                                    },
                                    "description": "Lista de itens (máximo 5, únicos)",
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
                            }
                        },
                        "description": "Lista de carros"
                    }
                }
            }
        }
    }
}
