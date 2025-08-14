# 🐦 Sistema Pombo Correio - Delivery Aéreo

Sistema de gerenciamento de entregas utilizando pombos-correio para o Sr. Moraes Moreira.

## 📋 Funcionalidades

- **Cadastro de Pombos:** Gerenciar informações dos pombos-correio
- **Cadastro de Clientes:** Controle de clientes do serviço
- **Envio de Cartas:** Sistema de envio e acompanhamento de status

## 🛠️ Stack Tecnológica

- **Backend:** Node.js + NestJS + TypeScript + Prisma + SQLite
- **Frontend:** React + TypeScript + Tailwind CSS
- **Containerização:** Docker + Docker Compose

## 🚀 Como Executar

### Pré-requisitos

- Node.js 20+
- Docker (opcional)

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Backend + Frontend juntos
npm run dev:backend      # Apenas backend
npm run dev:frontend     # Apenas frontend

# Build
npm run build:all        # Build completo
npm run build:backend    # Build apenas backend
npm run build:frontend   # Build apenas frontend

# Docker
npm run docker:build     # Build containers
npm run docker:up        # Subir containers
npm run docker:dev       # Build + subir containers
npm run start:prod       # Produção com Docker
```

### Desenvolvimento Local

1. Clone o repositório:

```bash
git clone git@github.com:jhonataswillian/pombo-correio-delivery.git
cd pombo-correio-delivery
```

2. Instalar dependências:

```bash
npm install
```

3. Executar em desenvolvimento:

```bash
# Opção 1: Tudo junto
npm run dev

# Opção 2: Separado
npm run dev:backend    # Terminal 1
npm run dev:frontend   # Terminal 2
```

### Com Docker

```bash
# Desenvolvimento
npm run docker:dev

# Produção
npm run start:prod
```

**URLs:**

- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## 🔧 Variáveis de Ambiente

### Backend (.env)

- `NODE_ENV` - Ambiente (development/production)
- `PORT` - Porta do servidor (padrão: 3001)
- `DATABASE_URL` - URL do banco SQLite

### Frontend

- `VITE_API_URL` - URL da API backend

### Configuração

Copie `.env.example` para `.env` e ajuste conforme necessário:

```bash
cp .env.example .env
```

## 📚 Estrutura

```
pombo-correio-delivery/
├── backend/              # API NestJS + Prisma + SQLite
├── frontend/             # React + TypeScript + Tailwind
├── docs/                 # Documentação API e banco
└── docker-compose.yml    # Containerização
```

## 🧪 Testes

```bash
# Backend - testes unitários
cd backend
npm test

# Testes específicos
npm test -- --testPathPatterns="pigeons.service.spec.ts"
npm test -- --testPathPatterns="letters.service.spec.ts"
npm test -- --testPathPatterns="customers.service.spec.ts"
```

## 📝 Documentação

- [API Endpoints](./docs/api.md)
- [Banco de Dados](./docs/database.md)

## 🐳 Docker

### Desenvolvimento

```bash
docker-compose up --build
```

### Produção

```bash
docker-compose -f docker-compose.prod.yml up -d
```

---

**Desenvolvido para o teste técnico da Empresa Oper**

"Eu sou um pássaro que vivo avoando. Vivo avoando sem nunca mais parar …" - Sr. Moraes Moreira
