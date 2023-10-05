FROM node:20-alpine AS deps
WORKDIR /server

COPY package.json package-lock.json ./

RUN npm install --f 


FROM node:20-alpine AS builder
WORKDIR /server
COPY --from=deps /server/node_modules ./node_modules
COPY . .

RUN npm run build


FROM node:20-alpine AS runner
WORKDIR /server

COPY --from=builder /server/build ./build
COPY --from=builder /server/node_modules ./node_modules
COPY --from=builder /server/package.json ./package.json

EXPOSE 5000

ENV PORT 5000
ENV NODE_ENV production

CMD [ "npm", "start" ]