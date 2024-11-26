export const createClient = {
    "components": {
        "schemas": {
            "CreateClientRequest": {
                "type": "object",
                "required": [
                    "name",
                    "birthDate",
                    "cpf",
                    "email",
                    "phone"
                ],
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
            },
            "CreateClientResponse": {
                "type": "object",
                "properties": {
                    "message": {
                        "type": "string",
                        "example": "Cliente criado com sucesso"
                    },
                    "client": {
                        "$ref": "#/components/schemas/CreateClientRequest"
                    }
                }
            }
        },
        "responses": {
            "ClientAlreadyExists": {
                "description": "E-mail ou CPF já cadastrado",
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "example": "E-mail ou CPF já cadastrado"
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
            "post": {
                "tags": ["Clients"],
                "summary": "Criação de novo cliente",
                "description": "Cadastra um novo cliente no sistema.",
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/CreateClientRequest"
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
                    "201": {
                        "description": "Cliente criado com sucesso"
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
                                                "type": "object",
                                                "properties": {
                                                    "field": {
                                                        "type": "string",
                                                        "example": "phone"
                                                    },
                                                    "message": {
                                                        "type": "string",
                                                        "example": "Required"
                                                    }
                                                },
                                                "required": ["field", "message"]
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "E-mail ou CPF já cadastrado"
                    }
                }
            }
        }
    }
}

