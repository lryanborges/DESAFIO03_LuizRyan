export const findOneClient = {
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
            }
        },
        "responses": {
            "ClientNotFound": {
                "description": "Cliente não encontrado",
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "example": "Cliente não encontrado"
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "paths": {
        "/client/{id}": {
            "get": {
                "tags": ["Clients"],
                "summary": "Visualizar cliente pelo ID",
                "description": "Consulta detalhada de um cliente específico pelo ID.",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid",
                            "description": "ID do cliente a ser consultado"
                        }
                    }
                ],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Cliente encontrado",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ClientResponse"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Cliente não encontrado"
                    }
                }
            }
        }
    }
}
