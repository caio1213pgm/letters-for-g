FROM node:22-slim

WORKDIR /app

ENV HOSTNAME=0.0.0.0
ENV PORT=3000

# Dependências (cache de camada enquanto package*.json não mudar)
COPY package.json package-lock.json ./
RUN npm ci

# Código da aplicação
COPY . .

# Gera o client do Prisma e compila o Next.js
RUN npx prisma generate && npm run build

# Só depois do build: o npm ci precisa das devDependencies (ex.: @tailwindcss/postcss)
ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]
