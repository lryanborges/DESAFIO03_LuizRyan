export const findOneOrder = {
    "paths": {
        "/order/{id}": {
            "get": {
                "security": [
                    {
                        "BearerAuth": []
                    }
                ],
                "tags": ["Orders"],
                "summary": "Visualizar um pedido por ID",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "ID do pedido a ser consultado",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Pedido encontrado",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/OrderDetail"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Pedido não encontrado"
                    }
                }
            }
        }
    },
    "components": {
        "schemas": {
            "OrderDetail": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "status": {
                        "type": "string",
                        "description": "Status do pedido"
                    },
                    "dateStart": {
                        "type": "string",
                        "format": "date-time",
                        "nullable": true
                    },
                    "dateEnd": {
                        "type": "string",
                        "format": "date-time",
                        "nullable": true
                    },
                    "cancellationDate": {
                        "type": "string",
                        "format": "date-time",
                        "nullable": true
                    },
                    "totalValue": {
                        "type": "number",
                        "description": "Valor total do pedido"
                    },
                    "cep": {
                        "type": "string",
                        "nullable": true
                    },
                    "city": {
                        "type": "string",
                        "nullable": true
                    },
                    "uf": {
                        "type": "string",
                        "nullable": true
                    },
                    "client": {
                        "type": "object",
                        "properties": {
                            "id": {
                                "type": "string",
                                "description": "ID do cliente"
                            },
                            "name": {
                                "type": "string",
                                "description": "Nome do cliente"
                            },
                            "email": {
                                "type": "string",
                                "description": "Email do cliente"
                            },
                            "cpf": {
                                "type": "string",
                                "description": "CPF do cliente"
                            }
                        }
                    },
                    "car": {
                        "type": "object",
                        "properties": {
                            "id": {
                                "type": "string",
                                "description": "ID do carro"
                            },
                            "brand": {
                                "type": "string",
                                "description": "Marca do carro"
                            },
                            "model": {
                                "type": "string",
                                "description": "Modelo do carro"
                            },
                            "year": {
                                "type": "integer",
                                "description": "Ano do carro"
                            },
                            "km": {
                                "type": "number",
                                "description": "Quilometragem do carro"
                            },
                            "items": {
                                "type": "array",
                                "items": {
                                    "type": "string"
                                },
                                "description": "Itens associados ao carro"
                            },
                            "licensePlate": {
                                "type": "string",
                                "description": "Placa do carro"
                            }
                        }
                    }
                }
            }
        }
    }
}
