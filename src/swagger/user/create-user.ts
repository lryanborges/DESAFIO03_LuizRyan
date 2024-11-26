export const createUser = {
    "components": {
        "schemas": {
            "User": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string",
                        "description": "Nome completo do usuário"
                    },
                    "email": {
                        "type": "string",
                        "format": "email",
                        "description": "Endereço de e-mail único do usuário"
                    },
                    "password": {
                        "type": "string",
                        "description": "Senha criptografada do usuário"
                    }
                },
                "required": [
                    "name",
                    "email",
                    "password"
                ]
            }
        }
    },
    "paths": {
        "/user": {
            "post": {
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "tags": ["Users"],
                "summary": "Cadastro de novo usuário",
                "description": "Cria um novo usuário com dados validados e e-mail exclusivo.",
                "requestBody": {
                    "description": "Dados para criação de um novo usuário",
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/User"
                            },
                            "example": {
                                "name": "João Silva",
                                "email": "joao.silva@exemplo.com",
                                "password": "senha1234"
                            }
                        }
                    }
                },
                "responses": {
                    "201": {
                        "description": "Usuário criado com sucesso"
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
                                                        "example": "email"
                                                    },
                                                    "message": {
                                                        "type": "string",
                                                        "example": "The field email is required"
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
                        "description": "Já existe um usuário cadastrado com esse email"
                    }
                }
            }
        }
    }
}

