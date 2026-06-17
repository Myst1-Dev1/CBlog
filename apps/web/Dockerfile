# 1. Etapa de "Poda" (Prune)
FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune web --docker

# 2. Etapa de Instalação e Build
FROM node:20-alpine AS installer
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm install

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
# Build padrão do Next.js (sem standalone no config)
RUN npx turbo build --filter=web

# 3. Etapa de Runner (Imagem Final)
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
# Porta que você definiu
ENV PORT=4010

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Copia os arquivos necessários para rodar o 'next start'
# Precisamos do package.json da raiz e do app para o comando 'npm start' funcionar
COPY --from=installer /app/package.json .
COPY --from=installer /app/package-lock.json .
COPY --from=installer /app/node_modules ./node_modules
COPY --from=installer /app/apps/web ./apps/web

# Expõe a porta correta
EXPOSE 4010

# Como estamos em um monorepo, precisamos rodar o start filtrando o app
# Ou entrar na pasta do app e rodar o next start
CMD ["npx", "next", "start", "apps/web", "-p", "4010"]