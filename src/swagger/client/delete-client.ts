export const deleteClient = {
    "paths": {
        "/client/{id}": {
            "delete": {
                "tags": ["Clients"],
                "summary": "Excluir cliente",
                "description": "Marca o cliente como excluído, definindo a data de exclusão. O cliente não é removido do banco de dados para fins de auditoria.",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "ID do cliente a ser excluído (UUID)",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
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
                        "description": "Cliente deletado com sucesso"
                    },
                    "404": {
                        "description": "Cliente não encontrado"
                    }
                }
            }
        }
    }
}

