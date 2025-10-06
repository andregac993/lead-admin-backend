# Lead Admin Backend

Sistema backend para gerenciamento de leads capturados através de landing pages, com autenticação JWT e API Key para integração externa.

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **NestJS** - Framework backend progressivo
- **TypeScript** - Superset tipado do JavaScript
- **PostgreSQL** - Banco de dados relacional
- **Prisma ORM** - ORM moderno para Node.js e TypeScript
- **JWT (JSON Web Tokens)** - Autenticação via tokens
- **API Key** - Autenticação para integrações externas
- **Docker** - Containerização da aplicação
- **Bcrypt** - Hash de senhas
- **Zod** - Validação de schemas

## 📋 Pré-requisitos

- Node.js (v18 ou superior)
- Docker e Docker Compose
- npm ou yarn

## ⚙️ Configuração do Ambiente

### 1. Clone o repositório

```bash
git clone <repository-url>
cd lead-admin-backend
```

### 2. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Database
DATABASE_URL="postgresql://postgres:docker@localhost:5432/lead-admin"

# JWT Keys (RS256)
JWT_PRIVATE_KEY="sua_chave_privada_base64"
JWT_PUBLIC_KEY="sua_chave_publica_base64"

# Server Port
PORT=3333
```

**Nota sobre PORT**: A variável `PORT` é utilizada apenas em ambiente local. Em produção (Vercel), a plataforma define a porta automaticamente.

### 3. Instalação de Dependências

```bash
npm install
```

## 🐳 Executando com Docker

### Subir o banco de dados PostgreSQL

```bash
docker-compose up -d
```

Este comando irá:
- Criar um container PostgreSQL
- Expor a porta 5432
- Criar o banco de dados `lead-admin`
- Persistir os dados na pasta `./data/pg`

**Importante**: O Docker Compose apenas sobe o banco de dados. A aplicação NestJS roda localmente via npm.

### Verificar se o container está rodando

```bash
docker ps
```

## 🗄️ Migrations do Banco de Dados

Após subir o banco de dados, execute as migrations:

```bash
npx prisma migrate deploy
```

Para desenvolvimento:

```bash
npx prisma migrate dev
```

## 🏃 Executando a Aplicação

### Desenvolvimento

```bash
npm run start:dev
```

A aplicação estará disponível em `http://localhost:3333`

### Produção

```bash
npm run build
npm run start:prod
```

## 📚 Endpoints da API

A aplicação possui os seguintes grupos de endpoints:

### 🔐 Autenticação

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | `/users` | Criar nova conta | Não |
| POST | `/sessions` | Fazer login | Não |

### 👤 Usuários

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | `/users/api-key/generate` | Gerar API Key | JWT |
| GET | `/users/api-key` | Obter API Key | JWT |
| DELETE | `/users/api-key` | Revogar API Key | JWT |

### 📄 Landing Pages

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | `/landing-pages` | Criar landing page | JWT |
| GET | `/landing-pages` | Listar landing pages | JWT |
| GET | `/landing-pages?page=1&perPage=10&search=termo` | Listar com filtros | JWT |

### 📊 Leads

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | `/leads` | Criar lead | JWT ou API Key |
| GET | `/leads` | Listar leads | JWT |
| GET | `/leads?page=1&perPage=20&search=nome` | Listar com filtros | JWT |
| GET | `/leads?landingPageId=<id>` | Filtrar por landing page | JWT |
| GET | `/leads/:id` | Buscar lead por ID | JWT |
| PUT | `/leads/:id` | Atualizar lead | JWT |
| DELETE | `/leads/:id` | Deletar lead | JWT |
| GET | `/leads/export/:landingPageId` | Exportar leads em CSV | JWT |

## 🔑 Autenticação

A API suporta dois tipos de autenticação:

### 1. JWT (JSON Web Token)
Usado para operações administrativas. Adicione o header:
```
Authorization: Bearer <seu_token_jwt>
```

### 2. API Key
Usado para integração em landing pages externas. Adicione o header:
```
Authorization: Bearer <sua_api_key>
```

## 📝 Testando a API

O projeto inclui um arquivo `client.http` na raiz com todas as requisições HTTP prontas para uso.

### Como usar:

1. **VS Code**: Instale a extensão "REST Client"
2. **JetBrains IDEs**: Suporte nativo para arquivos `.http`
3. Abra o arquivo `client.http`
4. Atualize as variáveis `@authToken` e `@apiKey` conforme necessário
5. Clique em "Send Request" acima de cada endpoint

### Variáveis do client.http:

```http
@baseurl = https://lead-admin-backend.vercel.app
@authToken = <seu_token_jwt>
@apiKey = <sua_api_key>
```

## 📦 Estrutura do Projeto

```
src/
├── config/           # Configurações (env, validação)
├── modules/
│   ├── user/         # Módulo de usuários
│   ├── landing-page/ # Módulo de landing pages
│   └── lead/         # Módulo de leads
│       ├── controllers/
│       ├── services/
│       ├── repositories/
│       ├── dto/
│       └── presenters/
└── shared/
    ├── auth/         # Estratégias de autenticação
    ├── database/     # Configuração do Prisma
    └── pipes/        # Pipes de validação
```

## 🔄 Deploy na Vercel

### 1. Configurar variáveis de ambiente

No painel da Vercel, adicione as mesmas variáveis do `.env`:
- `DATABASE_URL`
- `JWT_PRIVATE_KEY`
- `JWT_PUBLIC_KEY`

**Importante**: Não é necessário configurar `PORT` na Vercel, pois a plataforma gerencia isso automaticamente.

### 2. O arquivo `vercel.json` já está configurado

O projeto possui configuração para build automatizado via Vercel.

### 3. Deploy

```bash
vercel --prod
```

ou configure deploy automático via GitHub no painel da Vercel.

### 4. Banco de Dados em Produção

O Docker Compose é apenas para desenvolvimento local. Em produção, utilize um banco de dados gerenciado (Railway, Supabase, etc.) e configure a `DATABASE_URL` adequadamente.

## 🛠️ Scripts Disponíveis

```bash
npm run start          # Inicia em modo normal
npm run start:dev      # Inicia em modo desenvolvimento (watch)
npm run start:prod     # Inicia em modo produção
npm run build          # Compila o projeto
npm run lint           # Executa o linter
npm run format         # Formata o código
```

## 📊 Modelo de Dados

### User
- id, name, email, password, apiKey, createdAt
- Relações: leads[], landingPages[]

### LandingPage
- id, userId, name, slug, url, createdAt, updatedAt
- Relações: user, leads[]

### Lead
- id, userId, landingPageId
- name, email, phone, position, dateOfBirth, message
- utmSource, utmMedium, utmCampaign, utmTerm, utmContent
- gclid, fbclid
- createdAt, updatedAt
- Relações: user, landingPage

## 📄 Exportação de Dados

O endpoint de exportação (`GET /leads/export/:landingPageId`) retorna um arquivo CSV com todos os leads da landing page especificada, excluindo campos sensíveis como `userId`.

## 🔒 Segurança

- Senhas hasheadas com bcrypt
- Autenticação JWT com chaves RSA
- API Keys únicas por usuário
- Validação de dados com Zod
- CORS habilitado

## 📝 Licença



