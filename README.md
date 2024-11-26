## Pré-requisitos

Antes de iniciar, você precisará ter as seguintes ferramentas instaladas em sua máquina:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/downloads)

## Instalação

Siga os passos abaixo para configurar e rodar a aplicação localmente.

### 1. Clone o repositório

```bash
git clone git@github.com:jlucasbx/AWS_NODE_SET24_DESAFIO_02_THE_GOOD_DOCKER.git
cd AWS_NODE_SET24_DESAFIO_02_THE_GOOD_DOCKER.git
```

### 2. Executar a aplicação com Docker Compose

No diretório do projeto copie o `.env.example` para um arquivo `.env` e execute o comando abaixo para inicializar os containers do Node.js e Postgres em segundo plano:

```bash
docker-compose up --build -d
```

Isso irá baixar as imagens necessárias, configurar o ambiente e iniciar a aplicação, por padrão toda vez que o container do node é iniciado ele irá executar as migrations e o dump do banco de dados juntamente com o "npm install".

A aplicação irá esperar até que o banco de dados esteja pronto para iniciar por isso a api pode demorar um pouco para iniciar é possível conferir o andamento desse processo nos logs do container do node usando o comando abaixo.

```bash
docker-compose logs -f node
```
### 3. Acessar a aplicação

credenciais de administrado

{
    "name": "Administrador",
    "email": "admin@example.com",
    "password": "adminadmin"
}

Após subir os containers, a aplicação estará disponível em:

```
http://localhost:3000
```

### 4. Acessar a documentação

A documentaçao da aplicação estará disponível em:

```
http://localhost:3000/api-docs
```

### Configuração em Outro Ambiente

Para executar esta aplicação em um ambiente diferente, é necessário configurar as variáveis de ambiente listadas no arquivo `.env.example` no novo ambiente.  
**Observação:** O arquivo `.env.example` serve como referência para documentar as variáveis que precisam ser configuradas e também podem ser usadas para criar o arquivo `.env` que é usado em ambiente de desenvolvimento. 

### Ambiente de Produção

Se for executar a aplicação em um ambiente de produção, após configurar a infraestrutura (seja em um servidor próprio ou em serviços de nuvem como AWS, Azure ou Google Cloud Platform), e as variáveis de ambiente, execute os comandos abaixo para iniciar a aplicação:

```bash
npm install
npm run build
npm run start
```

## Comandos Úteis

### Subir containers em segundo plano

```bash
docker-compose up -d
```

### Parar e remover containers com seus dados

```bash
docker-compose down -v
```

### Visualizar logs

```bash
docker-compose logs
```
