# Dockerfile multi-stage pour optimiser la taille
FROM node:18-alpine AS base

# Installer pnpm
RUN npm install -g pnpm

# Stage 1: Installer les dépendances
FROM base AS deps
WORKDIR /app

# Copier les fichiers de configuration
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages ./packages
COPY apps/web/package.json ./apps/web/

# Installer les dépendances
RUN pnpm install --frozen-lockfile

# Stage 2: Builder l'application
FROM base AS builder
WORKDIR /app

# Copier les dépendances installées
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages ./packages

# Copier le code source
COPY apps/web ./apps/web
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Builder l'application
RUN pnpm build --filter=web

# Stage 3: Image de production
FROM node:18-alpine AS runner
WORKDIR /app

# Créer un utilisateur non-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copier les fichiers nécessaires
COPY --from=builder /app/apps/web/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"] 