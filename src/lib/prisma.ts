import { Prisma, PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = `${process.env.DATABASE_URL}`;

// O Neon (e a rede do Docker/WSL) pode encerrar conexões ociosas do pool sem avisar

const adapter = new PrismaPg({
  connectionString,
  connectionTimeoutMillis: 10_000,
  idleTimeoutMillis: 5_000,
  keepAlive: true,
});

const READ_OPERATIONS = new Set([
  "findMany",
  "findFirst",
  "findFirstOrThrow",
  "findUnique",
  "findUniqueOrThrow",
  "count",
  "aggregate",
  "groupBy",
]);
function isConnectionClosedError(error: unknown) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P1017") {
      return true;
    }
  }
}

function createPrismaClient() {
  const prismaClient = new PrismaClient({ adapter }).$extends({
    query: {
      async $allOperations({ operation, args, query }) {
        try {
          return await query(args);
        } catch (error) {
          // Só repete leituras: uma escrita pode ter sido aplicada antes da conexão cair
          if (
            !READ_OPERATIONS.has(operation) ||
            !isConnectionClosedError(error)
          ) {
            throw error;
          }
          return query(args);
        }
      },
    },
  });
  return prismaClient;
}

const globalForPrisma = globalThis as unknown as {
  prisma?: ReturnType<typeof createPrismaClient>;
};

const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export { prisma };
