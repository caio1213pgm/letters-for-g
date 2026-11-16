FROM node:22-slim

WORKDIR /app

ENV HOSTNAME=0.0.0.0
ENV PORT=3000

# Dependências (cache de camada enquanto package*.json não mudar).
# NODE_ENV ainda não é production aqui: o build precisa das devDependencies (ex.: @tailwindcss/postcss)
COPY package.json package-lock.json ./
RUN npm ci

# Código da aplicação
COPY . .

# O build e o runtime rodam como produção
ENV NODE_ENV=production

# Gera o client do Prisma e compila o Next.js
RUN npx prisma generate && npm run build

EXPOSE 3000

# Aplica as migrações pendentes antes de subir o servidor
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
