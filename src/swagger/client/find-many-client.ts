export const findManyClient = {
    "components": {
        "schemas": {
            "ClientResponse": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "format": "uuid",
                        "description": "ID do cliente (UUID)"
                    },
                    "name": {
                        "type": "string",
                        "description": "Nome completo do cliente"
                    },
                    "birthDate": {
                        "type": "string",
                        "format": "date",
                        "description": "Data de nascimento do cliente"
                    },
                    "cpf": {
                        "type": "string",
                        "description": "CPF do cliente"
                    },
                    "email": {
                        "type": "string",
                        "format": "email",
                        "description": "E-mail do cliente"
                    },
                    "phone": {
                        "type": "string",
                        "description": "Telefone do cliente"
                    },
                    "createdAt": {
                        "type": "string",
                        "format": "date-time",
                        "description": "Data e hora em que o cliente foi cadastrado"
                    },
                    "excludedAt": {
                        "type": "string",
                        "format": "date-time",
                        "nullable": true,
                        "description": "Data e hora em que o cliente foi excluído"
                    }
                }
            },
            "ClientListResponse": {
                "type": "object",
                "properties": {
                    "total": {
                        "type": "integer",
                        "description": "Total de clientes encontrados"
                    },
                    "totalPages": {
                        "type": "integer",
                        "description": "Total de páginas disponíveis"
                    },
                    "currentPage": {
                        "type": "integer",
                        "description": "Número da página atual"
                    },
                    "clients": {
                        type: "array",
                        items: {
                            "$ref": "#/components/schemas/ClientResponse"
                        }
                    }
                }
            }
        },
        "responses": {
            "NoResultsFound": {
                "description": "Nenhum resultado encontrado",
                "content": {
                    "application/json": {
                        "schema": {
                            type: "object",
                            properties: {
                                "message": {
                                    type: "string",
                                    example: "Nenhum cliente encontrado"
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "paths": {
        "/client": {
            "get": {
                "tags": ["Clients"],
                "summary": "Listar clientes",
                "description": "Lista todos os clientes cadastrados com opções de filtragem, ordenação e paginação.",
                "parameters": [
                    {
                        "name": "name",
                        "in": "query",
                        "description": "Filtrar clientes pelo nome (parte do nome)",
                        "required": false,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "email",
                        "in": "query",
                        "description": "Filtrar clientes pelo e-mail (parte do e-mail)",
                        "required": false,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "cpf",
                        "in": "query",
                        "description": "Filtrar clientes pelo CPF (CPF completo e válido)",
                        "required": false,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "excludedAt",
                        "in": "query",
                        "schema": {
                            "type": "date",
                            "example": "2024-11-03"
                        },
                        "description": "Filtra clientes excluídos pela data de exclusão"
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
                        "description": "Tamanho máximo da list de clientes retornada",
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
                            "enum": ["createdAt", "excludedAt"],
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
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Clientes encontrados",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ClientListResponse"
                                }
                            }
                        }
                    },
                    "204": {
                        "description": "Requisição bem sucedida porém nenhum cliente encontrado"
                    }
                }
            }
        }
    }
}
