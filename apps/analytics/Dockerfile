FROM node:22-alpine as builder

WORKDIR /app

COPY package*.json ./
COPY nest-cli.json ./
COPY tsconfig*.json ./
COPY apps/analytics/ apps/analytics/

RUN npm install \
  && npm run build analytics \
  && npm prune --production analytics

FROM node:22-alpine as runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/analytics/dist ./dist

EXPOSE 9092

CMD ["node", "dist/main"]