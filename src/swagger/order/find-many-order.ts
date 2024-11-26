
export const findManyOrder = {
    "paths": {
        "/order": {
            "get": {
                "security": [
                    {
                        "BearerAuth": []
                    }
                ],
                "tags": ["Orders"],
                "summary": "Listar todos os pedidos",
                "parameters": [
                    {
                        "name": "status",
                        "in": "query",
                        "required": false,
                        "description": "Status do carro (ativo ou inativo)",
                        "schema": {
                            "type": "string",
                            "enum": ["aberto", "cancelado", "aprovado"],
                            "example": ["aberto"]
                        }
                    },
                    {
                        "name": "cpf",
                        "in": "query",
                        "required": false,
                        "description": "Filtrar pelo CPF do cliente",
                        "example": "68557832010",
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "startDate",
                        "in": "query",
                        "required": false,
                        "description": "Filtrar pela data inicial",
                        "example": "2024-11-04",
                        "schema": {
                            "type": "string",
                            "format": "date"
                        }
                    },
                    {
                        "name": "endDate",
                        "in": "query",
                        "required": false,
                        "description": "Filtrar pela data final",
                        "example": "2024-11-04",
                        "schema": {
                            "type": "string",
                            "format": "date"
                        }
                    },
                    {
                        "name": "page",
                        "in": "query",
                        "schema": {
                            "type": "integer",
                            "default": 1
                        },
                        "description": "Número da página a ser exibida"
                    },
                    {
                        "name": "limit",
                        "in": "query",
                        "required": false,
                        "description": "Tamanho máximo da list de pedidos retornada",
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
                            "enum": ["createdAt"],
                            "example": "createdAt",
                            "default": "createdAt"
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
                        "description": "Lista de pedidos recuperada com sucesso",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/OrderListResponse"
                                }
                            }
                        }
                    },
                    "204": {
                        "description": "Requisição bem sucedida porém nenhum pedido encontrado"
                    }
                }
            }
        }
    },
    "components": {
        "schemas": {
            "OrderListResponse": {
                "type": "object",
                "properties": {
                    "total": {
                        "type": "integer",
                        "description": "Número total de pedidos"
                    },
                    "totalPages": {
                        "type": "integer",
                        "description": "Número total de páginas"
                    },
                    "orders": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/OrderSummary"
                        }
                    }
                }
            },
            "OrderSummary": {
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
                        "format": "date",
                        "nullable": true
                    },
                    "dateEnd": {
                        "type": "string",
                        "format": "date",
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
                                "description": "ID do cliente",
                                "example": "28928e56-1e4f-4c72-9d55-34caec512b3d"
                            },
                            "name": {
                                "type": "string",
                                "description": "Nome do cliente"
                            },
                            "cpf": {
                                "type": "string",
                                "description": "CPF do cliente"
                            }
                        }
                    }
                }
            }
        }
    }
}
