export const updateUser = {
    "components": {
        "schemas": {
            "UserUpdate": {
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
                        "description": "Nova senha do usuário (deve ser criptografada)"
                    }
                }
            }
        },
        "responses": {
            "UserNotFound": {
                "description": "Usuário não encontrado",
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "example": "Usuário não encontrado"
                                }
                            }
                        }
                    }
                }
            },
            "UserExcluded": {
                "description": "Usuário excluído não pode ser atualizado",
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "example": "Usuário excluído não pode ser atualizado"
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "paths": {
        "/user/{id}": {
            "patch": {
                "tags": ["Users"],
                "summary": "Atualização de usuário",
                "description": "Permite a atualização de informações de um usuário, exceto campos imutáveis.",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        },
                        "description": "ID do usuário a ser atualizado"
                    }
                ],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/UserUpdate"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Usuário atualizado com sucesso"
                    },
                    "404": {
                        "description": "Usuário não encontrado"
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
                                                "example": "The email is required"
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
