import { defineConfig } from "prisma/config";

// Carrega o .env com o próprio Node, sem depender do pacote dotenv.
// Em produção (Docker) o arquivo não existe e as variáveis já vêm do ambiente.
try {
  process.loadEnvFile();
} catch {
  // Sem .env: segue com as variáveis de ambiente do processo
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
