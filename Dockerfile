FROM node:24-alpine AS deps
# See https://github.com/nodejs/docker-node?tab=readme-ov-file#nodealpine for details
RUN apk add --no-cache gcompat

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci


# --------------------------------------------------
FROM node:24-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build
RUN npm prune --omit=dev


# --------------------------------------------------
FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 sveltekit
RUN adduser --system --uid 1001 sveltekit

COPY --from=builder --chown=sveltekit:sveltekit /app/build ./build
COPY --from=builder --chown=sveltekit:sveltekit /app/node_modules ./node_modules
# for module resolution
COPY --chown=sveltekit:sveltekit package.json .

USER sveltekit

EXPOSE 3000
ENV PORT=3000
ENV HOST=0.0.0.0

CMD ["node", "build/index.js"]
