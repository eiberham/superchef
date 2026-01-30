FROM node:22-alpine as builder

WORKDIR /app

COPY package*.json ./
COPY nest-cli.json ./
COPY tsconfig*.json ./
COPY prisma/ prisma/
COPY apps/superchef/ apps/superchef/

RUN npm install \
  && npx prisma generate \
  && npm run build superchef \
  && npm prune --production superchef

FROM node:22-alpine as runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/superchef/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD ["node", "dist/main"]
