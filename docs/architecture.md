# Fyrmma Architecture Overview

## 1. Technology Stack
- **Frontend**: Next.js (React) – App Router, TypeScript, CSS Modules / Tailwind CSS
- **Backend**: Node.js 20+ with Fastify – TypeScript, decorators, async/await
- **Database**: PostgreSQL 15+ accessed via Prisma ORM
- **Authentication**: JWT + Refresh Tokens (stored in `RefreshToken` table)
- **Environment**: Managed via `.env` files and `pnpm` workspaces

## 2. Repository Structure
