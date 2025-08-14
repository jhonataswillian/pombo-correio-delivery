FROM node:18-alpine

WORKDIR /app

# Copiar package files
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependências
RUN npm ci

# Gerar Prisma client
RUN npx prisma generate

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Criar usuário não-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001
RUN chown -R nestjs:nodejs /app
USER nestjs

# Expor porta
EXPOSE 3001

# Comando de start (mais robusto)
CMD ["sh", "-c", "find dist -name 'main.js' -exec node {} \\;"]