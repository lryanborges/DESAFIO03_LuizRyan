export const findOneUser = {
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
                        "description": "Endereço de e-mail único do usuário"
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
                },
                "required": [
                    "id",
                    "name",
                    "email",
                    "createdAt"
                ]
            }
        }
    },
    "paths": {
        "/user/{id}": {
            "get": {
                "tags": ["Users"],
                "summary": "Visualizar usuário pelo ID",
                "description": "Consulta detalhada de um usuário específico, exibindo todas as suas informações.",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        },
                        "description": "ID do usuário a ser consultado"
                    }
                ],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Usuário encontrado com sucesso",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/User"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Usuário não encontrado"
                    }
                }
            }
        }
    }
}

