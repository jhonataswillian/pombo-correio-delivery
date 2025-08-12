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

### Desenvolvimento Local

1. Clone o repositório:
```bash
git clone git@github.com:SEU-USUARIO/pombo-correio-delivery.git
cd pombo-correio-delivery
```

2. Backend:
```bash
cd backend
npm install
npm run start:dev
```

3. Frontend:
```bash
cd frontend
npm install
npm run dev
```

### Com Docker
```bash
docker-compose up --build
```

## 📝 Documentação

- [API Endpoints](./docs/api.md)
- [Banco de Dados](./docs/database.md)

---

**Desenvolvido para o teste técnico da Empresa Oper**
