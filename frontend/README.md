# 🐦 Sistema Pombo Correio - Frontend

Interface web moderna para o sistema de gerenciamento de entregas utilizando pombos-correio do Sr. Moraes Moreira.

## ✨ Features

- 🏠 **Dashboard Interativo** - Estatísticas e navegação rápida
- 🐦 **Gestão de Pombos** - CRUD completo com avatars circulares
- 👥 **Gestão de Clientes** - Cadastro e edição com validações
- 📮 **Sistema de Cartas** - Envio e acompanhamento de status
- 📱 **Design Responsivo** - Mobile-first e adaptativo
- 🎨 **UI Moderna** - Glassmorphism, gradientes e micro-interações

## 🛠️ Stack Tecnológica

| Categoria     | Tecnologia       |
| ------------- | ---------------- |
| **Framework** | React 19         |
| **Language**  | TypeScript       |
| **Build**     | Vite             |
| **Styling**   | Tailwind CSS     |
| **Routing**   | React Router DOM |
| **HTTP**      | Axios            |
| **Icons**     | Lucide React     |

## 🚀 Quick Start

```bash
# Clone e instale
git clone git@github.com:jhonataswillian/pombo-correio-delivery.git
cd pombo-correio-delivery/frontend
npm install

# Configure a API
echo "VITE_API_URL=http://localhost:3001" > .env

# Execute
npm run dev
```

**🌐 Acesse:** http://localhost:3000

## 📁 Estrutura

```
frontend/src/
├── components/         # Componentes reutilizáveis
│   ├── ui/            # UI components (Toast, Footer, etc)
│   ├── Layout.tsx     # Layout principal
│   └── *Form.tsx      # Formulários
├── pages/             # Páginas da aplicação
│   ├── HomePage.tsx   # Dashboard
│   ├── PigeonsPage.tsx
│   ├── CustomersPage.tsx
│   └── LettersPage.tsx
├── services/          # API client
├── types/             # TypeScript interfaces
└── hooks/             # Custom hooks
```

## 🎯 Páginas Principais

### 🏠 Dashboard

- Cards de navegação com ícones
- Estatísticas em tempo real
- Hero section com gradientes
- Layout sem scroll vertical

### 🐦 Gestão de Pombos

- Grid responsivo com cards elegantes
- Avatar circular para foto do pombo
- Filtro para mostrar aposentados
- Modal de edição com preview de imagem

### 👥 Gestão de Clientes

- Cards organizados com informações
- Formulário com validações de email/data
- Integração com sistema de cartas
- Formatação automática de dados

### 📮 Sistema de Cartas

- Workflow: QUEUED → SENT → DELIVERED
- Filtros por status com badges coloridos
- Seleção de cliente e pombo ativo
- Regras de negócio aplicadas

## 🎨 Design System

### Cores

- **Primary:** Azul (#3b82f6) com gradientes
- **Secondary:** Cinza neutro para textos
- **Status Badges:** Verde (ativo/entregue), azul (enviado), amarelo (fila), cinza (aposentado)

### Componentes

- **Cards:** Glassmorphism com hover effects
- **Buttons:** Gradientes com micro-interações
- **Forms:** Validação visual e feedback
- **Toasts:** Notificações elegantes

### Responsividade

- **Mobile:** 1 coluna, navigation drawer
- **Tablet:** 2 colunas, nav horizontal
- **Desktop:** 3 colunas, layout expandido

## 🔄 Integração API

- **Base URL:** Configurável via `.env`
- **Timeout:** 10s com retry automático
- **Error Handling:** Interceptors globais + toasts
- **Loading States:** Skeletons e spinners
- **Type Safety:** Interfaces TypeScript completas

## ⚡ Performance

- **Bundle Size:** ~500kb gzipped
- **First Paint:** < 1.5s
- **Code Splitting:** Lazy loading automático
- **Image Optimization:** object-fit + fallbacks

## 🧪 Scripts

```bash
npm run dev          # Desenvolvimento
npm run build        # Build produção
npm run preview      # Preview do build
npm run lint         # Linting
npm run type-check   # Verificação TS
```

## 📱 Mobile Experience

- **Touch-friendly:** Botões otimizados para touch
- **Navigation:** Menu hambúrguer responsivo
- **Forms:** Teclados otimizados (email, number)
- **Performance:** Lazy loading de imagens

## 🔧 Configurações

### Variáveis de Ambiente

```env
VITE_API_URL=http://localhost:3001    # URL do backend
VITE_APP_VERSION=1.0.0                # Versão da aplicação
```

### Deploy

- **Vercel/Netlify:** Deploy automático do GitHub
- **GitHub Pages:** Workflow configurado
- **Docker:** Container otimizado disponível

## 🚨 Troubleshooting

**Backend não conecta:**

```bash
# Verificar se API está rodando
curl http://localhost:3001/health
```

**Build falha:**

```bash
# Limpar cache e reinstalar
rm -rf node_modules dist && npm install
```

---

**🚀 Desenvolvido por [Jhonatas Willian Nicolete](https://github.com/jhonataswillian)**

_Interface moderna para um negócio que voa alto!_
