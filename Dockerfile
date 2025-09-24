FROM node AS base

WORKDIR /app
COPY package*.json .
RUN npm install -g prisma

FROM base AS development

RUN npm i
COPY . .
RUN npx prisma generate
CMD ["npm", "run", "dev"]

FROM base AS builder

RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

FROM base AS production

RUN npm ci --only=production
COPY prisma ./prisma
RUN npx prisma generate
COPY --from=builder /app/dist ./dist
CMD [ "npm", "run", "start" ]