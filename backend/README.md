# 🐦 Backend - Pombo Correio

API REST para sistema de entregas utilizando pombos-correio.

## 🚀 Quick Start

```bash
# Instalar dependências
npm install

# Configurar banco
npx prisma migrate dev
npm run prisma:seed

# Executar
npm run start:dev
```

**API:** http://localhost:3001

## ✅ Funcionalidades

- 🐦 **Gestão de Pombos** - Cadastro + aposentadoria + validações
- 👥 **Gestão de Clientes** - Email único + validações completas
- 📮 **Sistema de Cartas** - Workflow de status + regras de negócio
- 🔒 **Validações** - DTOs com class-validator
- 🧪 **Testes** - 8+ testes unitários passando
- 🌱 **Seed** - Dados de demonstração

## 🛠️ Stack

- **NestJS** + TypeScript
- **Prisma** ORM + SQLite
- **class-validator** para validações
- **Jest** para testes
- **CORS** habilitado

## 📋 Regras de Negócio

### Pombos

- Apelido único obrigatório
- Velocidade > 0 km/h
- Aposentadoria irreversível
- Pombos aposentados não podem ser selecionados

### Clientes

- Email único e válido
- Todos os campos obrigatórios
- Data de nascimento no passado

### Cartas

- Status inicial: **QUEUED**
- Workflow: **QUEUED** → **SENT** → **DELIVERED**
- Status **DELIVERED** é irreversível
- Apenas pombos ativos podem ser selecionados

## 🌐 Endpoints Principais

| Método | Endpoint              | Descrição            |
| ------ | --------------------- | -------------------- |
| GET    | `/pigeons`            | Listar pombos ativos |
| POST   | `/pigeons`            | Criar pombo          |
| PATCH  | `/pigeons/:id/retire` | Aposentar pombo      |
| GET    | `/customers`          | Listar clientes      |
| POST   | `/customers`          | Criar cliente        |
| GET    | `/letters`            | Listar cartas        |
| POST   | `/letters`            | Criar carta          |
| PATCH  | `/letters/:id/status` | Alterar status       |

**Documentação completa:** [../docs/api.md](../docs/api.md)

## 🗃️ Banco de Dados

### Modelos

- **Pigeon** - id, nickname, averageSpeed, isActive
- **Customer** - id, name, email, birthDate, address
- **Letter** - id, content, status, senderId, pigeonId

### Relacionamentos

- Cliente → Cartas (1:N)
- Pombo → Cartas (1:N)

## 🧪 Testes

```bash
# Todos os testes
npm test

# Testes específicos
npm test pigeons.service.spec.ts
npm test letters.service.spec.ts
npm test customers.service.spec.ts
```

**Cobertura:** 8+ testes unitários passando

## 🌱 Dados de Exemplo

```bash
npm run prisma:seed
```

**Criará:**

- 3 pombos (2 ativos, 1 aposentado)
- 2 clientes
- 5 cartas com status variados

## 📝 Códigos HTTP

- **200** - Sucesso
- **201** - Criado
- **400** - Dados inválidos
- **404** - Não encontrado
- **409** - Conflito (email/apelido duplicado)

---

**Stack:** NestJS + Prisma + SQLite | **Testes:** Jest | **Docs:** Swagger

---

**🚀 Desenvolvido por [Jhonatas Willian Nicolete](https://github.com/jhonataswillian)**
