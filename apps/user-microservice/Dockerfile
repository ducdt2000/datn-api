FROM node:16 as builder

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG APP_ENV=development
ENV NODE_ENV=${APP_ENV}

RUN npm run build user-microservice

RUN npm prune

FROM node:16-alpine

ARG APP_ENV=development
ENV NODE_ENV=${APP_ENV}

WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist
COPY ./apps/user-microservice/migrations ./migrations
COPY ./apps/user-microservice/ormconfig.ts ./ormconfig.ts

RUN apk --no-cache add curl

EXPOSE 3000

USER node