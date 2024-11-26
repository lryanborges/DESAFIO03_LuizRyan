export const deleteUser = {
    "paths": {
        "/user/{id}": {
            "delete": {
                "tags": ["Users"],
                "summary": "Exclusão de usuário (soft delete)",
                "description": "Marca o campo de data de exclusão do usuário com a data e hora atuais, sem remover o registro do banco de dados.",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        },
                        "description": "ID do usuário a ser excluído"
                    }
                ],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "responses": {
                    "204": {
                        "description": "Usuário excluído com sucesso"
                    },
                    "404": {
                        "description": "Usuário não encontrado"
                    }
                }
            }
        }
    }
}
