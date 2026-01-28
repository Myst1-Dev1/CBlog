FROM node:20-alpine AS base
WORKDIR /app

# PRUNE
FROM base AS pruner
COPY package.json package-lock.json ./
COPY apps ./apps
COPY packages ./packages
COPY turbo.json ./
RUN npx turbo prune notifications-service --docker

# BUILD
FROM base AS builder
COPY --from=pruner /app/out/json/ ./
COPY --from=pruner /app/out/package-lock.json ./package-lock.json
RUN npm ci
COPY --from=pruner /app/out/full/ ./
RUN npm run build --workspace=notifications-service

# RUNNER
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/apps/notifications-service/dist ./dist
COPY --from=builder /app/apps/notifications-service/package.json ./package.json

RUN npm install --omit=dev

CMD ["node", "dist/main.js"]
