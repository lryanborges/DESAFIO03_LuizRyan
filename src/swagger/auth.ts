
export const auth = {
    "paths": {
        "/auth": {
            "post": {
                "tags": ["Auth"],
                "summary": "Autenticação de usuário",
                "description": "Cria um token de acesso para o usuário a partir de suas crediciais",
                "requestBody": {
                    "description": "Dados para autenticação de uma usuário",
                    "required": true,
                    "content": {
                        "application/json": {
                            "example": {
                                "email": "joao.silva@exemplo.com",
                                "password": "alguma-senha"
                            }
                        }
                    }
                },
                "responses": {
                    "201": {
                        "description": "Usuário autenticado com sucesso",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "token": {
                                            "type": "string",
                                            "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA1YTVkMjg0LTAwOTctNGI4MS1hMzhiLTc3Mjc1NDlmYTE5NyIsImlhdCI6MTczMDczNjg0NSwiZXhwIjoxNzMwNzM3NzQ1fQ.ExuVqPC-jCOk-32ChJLST_BJ14vKIjiSXFBm3x7Sb7o"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "422": {
                        "description": "Authentication token is missing or invalid. Please provide a valid token in the Authorization header."
                    }
                }

            }
        }
    }
}
