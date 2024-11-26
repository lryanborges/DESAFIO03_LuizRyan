export const findManyUser = {
    "components": {
        "schemas": {
            "User": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "format": "uuid",
                        "description": "ID único do usuário"
                    },
                    "name": {
                        "type": "string",
                        "description": "Nome completo do usuário"
                    },
                    "email": {
                        "type": "string",
                        "format": "email",
                        "description": "Endereço de e-mail do usuário"
                    },
                    "createdAt": {
                        "type": "string",
                        "format": "date-time",
                        "description": "Data e hora de criação do usuário"
                    },
                    "excludedAt": {
                        "type": "string",
                        "format": "date-time",
                        "nullable": true,
                        "description": "Data e hora de exclusão do usuário, se aplicável"
                    }
                }
            },
            "UserListResponse": {
                "type": "object",
                "properties": {
                    "totalItems": {
                        "type": "integer",
                        "description": "Quantidade total de usuários encontrados"
                    },
                    "totalPages": {
                        "type": "integer",
                        "description": "Quantidade total de páginas disponíveis"
                    },
                    "currentPage": {
                        "type": "integer",
                        "description": "Número da página atual"
                    },
                    "pageSize": {
                        "type": "integer",
                        "description": "Quantidade de usuários por página"
                    },
                    "users": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/User"
                        }
                    }
                }
            }
        }
    },
    "paths": {
        "/user": {
            "get": {
                "tags": ["Users"],
                "summary": "Listagem de usuários",
                "description": "Lista todos os usuários cadastrados, com filtros opcionais, ordenação e paginação.",
                "parameters": [
                    {
                        "name": "name",
                        "in": "query",
                        "schema": {
                            "type": "string"
                        },
                        "description": "Parte do nome do usuário para filtro"
                    },
                    {
                        "name": "email",
                        "in": "query",
                        "schema": {
                            "type": "string"
                        },
                        "description": "Parte do e-mail do usuário para filtro"
                    },
                    {
                        "name": "excludedAt",
                        "in": "query",
                        "schema": {
                            "type": "date",
                            "example": "2024-11-03"
                        },
                        "description": "Filtra usuários excluídos pela data de exclusão"
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
                        "description": "Tamanho máximo da list de usuários retornada",
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
                            "enum": ["name", "createdAt", "excludedAt"],
                            "example": "name",
                            "default": "name"
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
                        "description": "Lista de usuários encontrada com sucesso",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/UserListResponse"
                                }
                            }
                        }
                    },
                    "204": {
                        "description": "Requisição bem sucedida porém nenhum usuário encontrado"
                    }
                }
            }
        }
    }
}
