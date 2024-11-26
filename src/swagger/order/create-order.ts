
export const createOrder = {
    "paths": {
        "/order": {
            "post": {
                "tags": ["Orders"],
                "security": [
                    {
                        "BearerAuth": []
                    }
                ],
                "summary": "Cria um novo pedido",
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "carId": {
                                        "type": "integer",
                                        "example": "44164232-d3df-478d-9e56-5610044ded29"
                                    },
                                    "clientId": {
                                        "type": "integer",
                                        "example": "28928e56-1e4f-4c72-9d55-34caec512b3d"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "201": {
                        "description": "Pedido criado com sucesso"
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
                                                        "example": "clientId"
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
                    }
                }
            }
        }
    }
}

