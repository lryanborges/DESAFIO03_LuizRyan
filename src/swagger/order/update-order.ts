
export const updateOrder = {
    "paths": {
        "/order/{id}": {
            "patch": {
                "security": [
                    {
                        "BearerAuth": []
                    }
                ],
                "tags": ["Orders"],
                "summary": "Atualizar um pedido existente",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "ID do pedido a ser atualizado",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    },
                    {
                        "name": "body",
                        "in": "body",
                        "required": true,
                        "description": "Detalhes da atualização do pedido",
                        "schema": {
                            "$ref": "#/components/schemas/OrderUpdateRequest"
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "Pedido atualizado com sucesso"
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
                                                "example": "The field cep is invalid"
                                            }
                                        }
                                    }
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
            "OrderUpdateRequest": {
                "type": "object",
                "properties": {
                    "dateStart": {
                        "type": "string",
                        "format": "date",
                        "example": "2024-11-10T12:00:00.000Z"
                    },
                    "dateEnd": {
                        "type": "string",
                        "format": "date",
                        "example": "2024-11-10T12:30:00.000Z"
                    },
                    "cep": {
                        "type": "string",
                        "description": "CEP válido para verificação de disponibilidade",
                        "example": "62810000"
                    },
                    "status": {
                        "type": "string",
                        "enum": ["aprovado", "cancelado"],
                        "description": "Novo status para o pedido"
                    }
                }
            },
            "OrderResponse": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "status": {
                        "type": "string"
                    },
                    "startDate": {
                        "type": "string",
                        "format": "date-time",
                        "nullable": true
                    },
                    "endDate": {
                        "type": "string",
                        "format": "date-time",
                        "nullable": true
                    },
                    "totalValue": {
                        "type": "number"
                    },
                    "zipCode": {
                        "type": "string",
                        "nullable": true
                    },
                    "city": {
                        "type": "string",
                        "nullable": true
                    },
                    "state": {
                        "type": "string",
                        "nullable": true
                    }
                }
            },
            "ErrorResponse": {
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
