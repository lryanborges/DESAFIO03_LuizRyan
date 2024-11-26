
export const deleteOrder = {
    "paths": {
        "/order/{id}": {
            "delete": {
                "security": [
                    {
                        "BearerAuth": []
                    }
                ],
                "tags": ["Orders"],
                "summary": "Cancelar um pedido existente",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "ID do pedido a ser cancelado",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Pedido cancelado com sucesso"
                    },
                    "404": {
                        "description": "Pedido não encontrado"
                    },
                    "409": {
                        "description": "Pedido já foi finalizado de alguma forma"
                    }
                }
            }
        },
        "components": {
            "schemas": {
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
                        "cancellationDate": {
                            "type": "string",
                            "format": "date-time"
                        },
                        "totalValue": {
                            "type": "number"
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
                        }
                    }
                }
            }
        }
    }
}
