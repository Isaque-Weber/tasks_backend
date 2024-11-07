FROM node:20 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:20 AS runner

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production
ENV TZ=America/Sao_Paulo

EXPOSE 8080

CMD ["node", "dist/server.js"]