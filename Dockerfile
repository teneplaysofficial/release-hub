# ---------- build stage ----------
FROM node:24-alpine AS build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

# ---------- runtime stage ----------
FROM node:24-alpine
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile
COPY --from=build --chown=appuser:appgroup /app/dist ./dist

USER appuser

ENTRYPOINT ["node", "dist/index.js"]
