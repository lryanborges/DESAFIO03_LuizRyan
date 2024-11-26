export const updateClient = {
    "components": {
        "schemas": {
            "UpdateClientRequest": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string",
                        "description": "Nome completo do cliente",
                        "example": "John Doe"
                    },
                    "birthDate": {
                        "type": "string",
                        "format": "date",
                        "description": "Data de nascimento do cliente",
                        "example": "2024-11-04"
                    },
                    "cpf": {
                        "type": "string",
                        "description": "CPF do cliente",
                        "example": "93726604006"
                    },
                    "email": {
                        "type": "string",
                        "format": "email",
                        "description": "E-mail do cliente",
                        "example": "user@example.com"
                    },
                    "phone": {
                        "type": "string",
                        "description": "Telefone do cliente",
                        "example": "+55 24 99820-4312"
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
                            type: "object",
                            properties: {
                                "message": {
                                    type: "string",
                                    example: "Cliente não encontrado"
                                }
                            }
                        }
                    }
                }
            },
            "UpdateClientResponse": {
                "description": "Cliente atualizado com sucesso",
                "content": {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                "message": {
                                    type: "string",
                                    example: "Cliente atualizado com sucesso"
                                },
                                "client": {
                                    "$ref": "#/components/schemas/ClientResponse"
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
            "patch": {
                "tags": ["Clients"],
                "summary": "Atualizar cliente",
                "description": "Permite a atualização das informações de um cliente que não esteja excluído. Todos os campos são opcionais.",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "ID do cliente a ser atualizado (UUID)",
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
                                "$ref": "#/components/schemas/UpdateClientRequest"
                            }
                        }
                    }
                },
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Cliente atualizado com sucesso"
                    },
                    "404": {
                        "description": "Cliente não encontrado"
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
                                                "example": "The field email is required"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
