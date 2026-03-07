FROM node:18-alpine AS base

# Install dependencies for the root package
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Backend
FROM base AS backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci
COPY backend ./
RUN npm run build

# Frontend
FROM base AS frontend  
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend ./
RUN npm run build

# Production stage - Backend
FROM node:18-alpine AS backend-prod
WORKDIR /app
COPY --from=backend /app/backend/dist ./dist
COPY --from=backend /app/backend/node_modules ./node_modules
COPY --from=backend /app/backend/package.json ./package.json
COPY --from=backend /app/backend/prisma ./prisma

EXPOSE 3001
CMD ["npm", "run", "start:prod"]
