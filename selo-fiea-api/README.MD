# Projeto Selo FIEA - Backend API

Repositório contendo o back-end do sistema de Certificação FIEA.

## Pré-requisitos

Antes de começar, garanta que você tenha os seguintes softwares instalados:
-   [Git](https://git-scm.com/)
-   [Docker](https://www.docker.com/products/docker-desktop/)
-   [Docker Compose](https://docs.docker.com/compose/install/)

## ⚙️ Configuração do Ambiente

1.  **Clone o repositório:**
    ```bash
    git clone git@github.com/BrandaoJatoba/selo-fiea-api.git
    cd selo-fiea-api
    ```

2.  **Crie o arquivo de variáveis de ambiente:**
    Copie o arquivo de exemplo `.env.example` para um novo arquivo chamado `.env` e preencha as variáveis.
    ```bash
    cp .env.example .env
    ```
    * **Observação:** O arquivo `.env` NUNCA deve ser enviado ao repositório Git.

## 🚀 Como Executar a Aplicação

Com o Docker em execução, suba todos os contêineres do projeto com um único comando:

```bash
docker-compose up -d --build
```
A flag `--build` força a reconstrução da imagem da API caso haja alterações no `Dockerfile` ou nas dependências.

## 🛑 Como Parar a Aplicação

Para parar todos os contêineres, execute:

```bash
docker-compose down
```

## 🌐 Acessando os Serviços

-   **API (Swagger UI):** [http://localhost:8000/docs](http://localhost:8000/docs)
-   **Banco de Dados (PostgreSQL):** `localhost:5432`
-   **MinIO Console:** [http://localhost:9001](http://localhost:9001)