# 🐦 Sistema Pombo Correio - API Backend

Sistema de gerenciamento de entregas utilizando pombos-correio para o Sr. Moraes Moreira.

## 📋 Funcionalidades

- **Cadastro de Pombos:** Gerenciar informações dos pombos-correio (foto, apelido, velocidade)
- **Cadastro de Clientes:** Controle de clientes do serviço (nome, email, endereço)
- **Envio de Cartas:** Sistema de envio e acompanhamento de status (fila → enviado → entregue)

## 🛠️ Stack Tecnológica

- **Backend:** Node.js + NestJS + TypeScript
- **Banco de Dados:** SQLite + Prisma ORM
- **Validação:** class-validator + class-transformer
- **Testes:** Jest

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+
- npm

### Instalação

1. **Clone o repositório:**

```bash
git clone git@github.com:jhonataswillian/pombo-correio-delivery.git
cd pombo-correio-delivery/backend
```

2. **Instale as dependências:**

```bash
npm install
```

3. **Configure o banco de dados:**

```bash
# Executar migrações
npx prisma migrate dev

# Popular com dados de exemplo
npm run prisma:seed
```

4. **Inicie o servidor:**

```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run start:prod
```

**API estará disponível em:** http://localhost:3001

## 📚 Documentação da API

### 🐦 Endpoints - Pombos

#### **GET /pigeons**

Lista pombos ativos

```bash
curl http://localhost:3001/pigeons
```

#### **GET /pigeons/all**

Lista todos os pombos (incluindo aposentados)

```bash
curl http://localhost:3001/pigeons/all
```

#### **GET /pigeons/:id**

Busca pombo específico

```bash
curl http://localhost:3001/pigeons/cmea7e4mv0000o45886dq730n
```

#### **POST /pigeons**

Criar novo pombo

```bash
curl -X POST http://localhost:3001/pigeons \
  -H "Content-Type: application/json" \
  -d '{
    "nickname": "Flash",
    "averageSpeed": 85.5,
    "photoUrl": "https://example.com/flash.jpg"
  }'
```

#### **PATCH /pigeons/:id**

Atualizar pombo

```bash
curl -X PATCH http://localhost:3001/pigeons/cmea7e4mv0000o45886dq730n \
  -H "Content-Type: application/json" \
  -d '{
    "averageSpeed": 90.0
  }'
```

#### **PATCH /pigeons/:id/retire**

Aposentar pombo

```bash
curl -X PATCH http://localhost:3001/pigeons/cmea7e4mv0000o45886dq730n/retire
```

---

### 👥 Endpoints - Clientes

#### **GET /customers**

Lista todos os clientes

```bash
curl http://localhost:3001/customers
```

#### **GET /customers/:id**

Busca cliente específico

```bash
curl http://localhost:3001/customers/cmea7e4n20000o458abc123def
```

#### **POST /customers**

Criar novo cliente

```bash
curl -X POST http://localhost:3001/customers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@email.com",
    "birthDate": "1990-05-15",
    "address": "Rua das Flores, 123 - São Paulo, SP"
  }'
```

#### **PATCH /customers/:id**

Atualizar cliente

```bash
curl -X PATCH http://localhost:3001/customers/cmea7e4n20000o458abc123def \
  -H "Content-Type: application/json" \
  -d '{
    "address": "Nova Rua, 456 - Rio de Janeiro, RJ"
  }'
```

---

### 📮 Endpoints - Cartas

#### **GET /letters**

Lista todas as cartas

```bash
curl http://localhost:3001/letters
```

#### **GET /letters/status/:status**

Filtra cartas por status (QUEUED, SENT, DELIVERED)

```bash
curl http://localhost:3001/letters/status/DELIVERED
```

#### **GET /letters/:id**

Busca carta específica

```bash
curl http://localhost:3001/letters/cmea7e4n30001o458xyz789abc
```

#### **POST /letters**

Criar nova carta

```bash
curl -X POST http://localhost:3001/letters \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Olá! Como você está?",
    "recipientName": "Maria Santos",
    "recipientAddress": "Rua das Palmeiras, 456 - Rio de Janeiro, RJ",
    "senderId": "cmea7e4n20000o458abc123def",
    "pigeonId": "cmea7e4mv0000o45886dq730n"
  }'
```

#### **PATCH /letters/:id/status**

Alterar status da carta

```bash
curl -X PATCH http://localhost:3001/letters/cmea7e4n30001o458xyz789abc/status \
  -H "Content-Type: application/json" \
  -d '{
    "status": "SENT"
  }'
```

## 🎯 Regras de Negócio

### **Pombos:**

- ✅ Apelido deve ser único
- ✅ Velocidade deve ser maior que 0
- ✅ Pombo aposentado não pode ser selecionado para entregas
- ✅ Aposentadoria é irreversível

### **Clientes:**

- ✅ Email deve ser único e válido
- ✅ Data de nascimento obrigatória
- ✅ Todos os campos são obrigatórios

### **Cartas:**

- ✅ Status inicia sempre como QUEUED
- ✅ Transições válidas: QUEUED → SENT → DELIVERED
- ✅ Status DELIVERED é irreversível
- ✅ Apenas pombos ativos podem ser selecionados
- ✅ Cliente remetente deve existir

## 🧪 Testes

```bash
# Executar todos os testes
npm run test

# Executar testes específicos
npm run test -- --testPathPatterns="pigeons.service.spec.ts"
npm run test -- --testPathPatterns="letters.service.spec.ts"

# Coverage
npm run test:cov
```

## 🗃️ Estrutura do Banco

### **Tabela: pigeons**

- `id` (String, PK)
- `nickname` (String, unique)
- `photoUrl` (String, optional)
- `averageSpeed` (Float)
- `isActive` (Boolean, default: true)
- `createdAt`, `updatedAt` (DateTime)

### **Tabela: customers**

- `id` (String, PK)
- `name` (String)
- `email` (String, unique)
- `birthDate` (DateTime)
- `address` (String)
- `createdAt`, `updatedAt` (DateTime)

### **Tabela: letters**

- `id` (String, PK)
- `content` (String)
- `recipientName` (String)
- `recipientAddress` (String)
- `status` (Enum: QUEUED, SENT, DELIVERED)
- `senderId` (FK → customers)
- `pigeonId` (FK → pigeons)
- `createdAt`, `updatedAt` (DateTime)

## 🚨 Códigos de Resposta

- **200** - Sucesso
- **201** - Criado com sucesso
- **400** - Dados inválidos / Regra de negócio violada
- **404** - Recurso não encontrado
- **409** - Conflito (email/apelido duplicado, status irreversível)

## 🌱 Dados de Exemplo

O sistema inclui dados de demonstração:

- **3 pombos** (2 ativos, 1 aposentado)
- **2 clientes**
- **5 cartas** com status variados

Execute `npm run prisma:seed` para popular o banco.

## 📝 Variáveis de Ambiente

```env
DATABASE_URL="file:./dev.db"
PORT=3001
```

---

**Desenvolvido para o teste técnico da Empresa Oper**

"Eu sou um pássaro que vivo avoando. Vivo avoando sem nunca mais parar …" - Sr. Moraes Moreira
