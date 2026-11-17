import { prisma } from "./prisma";

const CLEANUP_AFTER_MS = 24 * 60 * 60 * 1000;
const CLEANUP_CHANCE = 0.02;

type RateLimitRow = {
  attempts: number;
  windowStart: Date;
};

export type RateLimitState = {
  attempts: number;
  // Minutos até a janela atual desta chave terminar
  retryInMinutes: number;
};

// Conta uma tentativa para a chave e devolve o total da janela atual.
// O incremento é um único UPSERT: requisições em paralelo não conseguem
// ler o mesmo contador e passar juntas pelo limite.
export async function consumeRateLimit(
  key: string,
  windowMs: number,
): Promise<RateLimitState> {
  const now = new Date();
  const windowCutoff = new Date(now.getTime() - windowMs);

  const rows = await prisma.$queryRaw<RateLimitRow[]>`
    INSERT INTO "RateLimit" ("key", "attempts", "windowStart")
    VALUES (${key}, 1, ${now}::timestamp)
    ON CONFLICT ("key") DO UPDATE SET
      "attempts" = CASE
        WHEN "RateLimit"."windowStart" < ${windowCutoff}::timestamp THEN 1
        ELSE "RateLimit"."attempts" + 1
      END,
      "windowStart" = CASE
        WHEN "RateLimit"."windowStart" < ${windowCutoff}::timestamp THEN ${now}::timestamp
        ELSE "RateLimit"."windowStart"
      END
    RETURNING "attempts", "windowStart"
  `;
  const row = rows[0];

  if (Math.random() < CLEANUP_CHANCE) {
    // Limpeza oportunista: chaves paradas há mais de um dia não servem para nada.
    // Uma falha aqui nunca pode derrubar a requisição que está sendo limitada.
    const staleCutoff = new Date(now.getTime() - CLEANUP_AFTER_MS);
    try {
      await prisma.$executeRaw`
        DELETE FROM "RateLimit" WHERE "windowStart" < ${staleCutoff}::timestamp
      `;
    } catch {
      // Ignorado de propósito
    }
  }

  const retryAt = row.windowStart.getTime() + windowMs;
  return {
    attempts: row.attempts,
    retryInMinutes: Math.max(1, Math.ceil((retryAt - now.getTime()) / 60000)),
  };
}

export async function resetRateLimit(key: string) {
  await prisma.$executeRaw`DELETE FROM "RateLimit" WHERE "key" = ${key}`;
}
