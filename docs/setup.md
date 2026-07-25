# Setup — Fyrmma Platform

Fundação técnica do monorepo SaaS Fyrmma (Sprint 0).

## Requisitos

- **Node.js** 20 ou superior
- **pnpm** 9 ou superior
- **Docker** e **Docker Compose** (somente para PostgreSQL)

## Instalação

1. Clone o repositório e entre na pasta raiz:

```bash
cd fyrmma-platform
```

2. Copie as variáveis de ambiente:

```bash
cp .env.example .env
cp .env.example packages/database/.env
```

3. Instale as dependências:

```bash
pnpm install
```

4. Suba o PostgreSQL via Docker:

```bash
docker compose -f docker/docker-compose.yml up -d
```

5. Gere o Prisma Client:

```bash
pnpm db:generate
```

6. (Opcional) Sincronize o schema com o banco:

```bash
pnpm db:push
```

## Comandos para iniciar

### Tudo em paralelo

```bash
pnpm dev
```

### Apenas o dashboard (porta 3000)

```bash
pnpm dev:dashboard
```

### Apenas a API (porta 3001)

```bash
pnpm dev:api
```

## Comandos Prisma

Executados a partir da raiz do monorepo:

| Comando | Descrição |
|---------|-----------|
| `pnpm db:generate` | Gera o Prisma Client |
| `pnpm db:push` | Sincroniza schema com o banco (dev) |
| `pnpm db:migrate` | Cria/aplica migrations (dev) |

## Comandos pnpm

| Comando | Descrição |
|---------|-----------|
| `pnpm install` | Instala dependências de todos os workspaces |
| `pnpm dev` | Inicia dashboard e API em modo desenvolvimento |
| `pnpm build` | Build de todos os pacotes e apps |

## Verificação

- **Dashboard:** http://localhost:3000
- **API health:** http://localhost:3001/health
- **API ready:** http://localhost:3001/health/ready

## Estrutura

```
fyrmma-platform/
├── apps/
│   ├── dashboard/    # Next.js (App Router)
│   └── api/          # Fastify
├── packages/
│   ├── database/     # Prisma
│   └── shared/       # Tipos compartilhados
├── docker/           # PostgreSQL 16
└── docs/
```

## Credenciais de desenvolvimento (PostgreSQL)

| Campo | Valor |
|-------|-------|
| Host | `localhost` |
| Porta | `5432` |
| Usuário | `fyrmma` |
| Senha | `fyrmma_dev` |
| Database | `fyrmma_dev` |
