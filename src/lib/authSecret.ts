// Um único segredo para o NextAuth, o proxy e os cookies de acesso às cartas.
// AUTH_SECRET é o nome oficial do Auth.js v5; NEXTAUTH_SECRET fica como alias.
export function getAuthSecret(): string {
  const secret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;
  if (!secret) {
    throw new Error("Defina AUTH_SECRET (ou NEXTAUTH_SECRET) no .env");
  }
  return secret;
}
