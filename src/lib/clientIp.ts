// Quantos proxies confiáveis existem na frente da aplicação (Vercel, nginx, etc.).
// Cada um acrescenta o IP de quem se conectou a ele no FIM do x-forwarded-for.
function trustedProxyHops() {
  const hops = Number(process.env.TRUSTED_PROXY_HOPS ?? "1");
  return Number.isInteger(hops) && hops >= 0 ? hops : 1;
}

// Devolve o IP do cliente segundo os proxies confiáveis, ou null quando não dá para saber.
// O início do x-forwarded-for é escrito pelo próprio cliente e pode ser forjado a cada
// requisição; por isso a leitura é feita de trás para frente, e nunca pelo primeiro item.
export function getClientIp(headerList: Headers): string | null {
  const hops = trustedProxyHops();
  // Sem proxy na frente, qualquer header de IP vem direto do cliente: não confiar
  if (hops === 0) return null;

  const forwarded = (headerList.get("x-forwarded-for") ?? "")
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  if (forwarded.length >= hops) {
    return forwarded[forwarded.length - hops];
  }
  return null;
}
