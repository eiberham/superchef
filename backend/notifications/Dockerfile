FROM node:22-alpine as builder

WORKDIR /app

COPY package*.json ./
COPY nest-cli.json ./
COPY tsconfig*.json ./
COPY backend/notifications/ backend/notifications/

RUN npm install \
  && npm run build notifications \
  && npm prune --production notifications

FROM node:22-alpine as runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/backend/notifications/dist ./dist

EXPOSE 5672

CMD ["node", "dist/main"]

