# ---------- build stage ----------
FROM node:22-alpine AS build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

# ---------- runtime stage ----------
FROM node:22-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

COPY --from=build /app/dist ./dist

RUN chmod +x dist/index.js

ENTRYPOINT ["node", "dist/index.js"]
