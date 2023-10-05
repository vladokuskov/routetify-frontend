FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --f 


FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build


FROM node:20-alpine AS runner
WORKDIR /app

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

ENV PORT 3000
ENV NODE_ENV production

CMD [ "npm", "start" ]