FROM node:22-alpine as builder

WORKDIR /app

COPY package*.json ./
COPY nest-cli.json ./
COPY tsconfig*.json ./
COPY backend/rabbitmq/ backend/rabbitmq/

RUN npm install \
  && npm run build rabbitmq \
  && npm prune --production rabbitmq

FROM node:22-alpine as runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/backend/rabbitmq/dist ./dist

EXPOSE 5672

CMD ["node", "dist/main"]

