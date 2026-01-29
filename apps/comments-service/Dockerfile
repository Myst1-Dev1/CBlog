FROM node:18-alpine AS base
WORKDIR /app

# PRUNE
FROM base AS pruner
COPY package.json package-lock.json ./
COPY apps ./apps
COPY packages ./packages
COPY turbo.json ./
RUN npx turbo prune comments-service --docker

# BUILD
FROM base AS builder
COPY --from=pruner /app/out/json/ ./
COPY --from=pruner /app/out/package-lock.json ./package-lock.json
RUN npm ci
COPY --from=pruner /app/out/full/ ./
RUN npm run build --workspace=comments-service

# RUNNER
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/comments-service/dist ./dist
COPY --from=builder /app/apps/comments-service/package.json ./package.json

CMD ["node", "dist/main.js"]