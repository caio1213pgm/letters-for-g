import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse, ProxyConfig } from "next/server";
import { getAuthSecret } from "@/lib/authSecret";

const LOGIN_URL = "/login";

const publicRoutes = [
  { path: "/login", isAuth: "redirect" },
  { path: "/register", isAuth: "redirect" },
  { path: "/", isAuth: "next" },
] as const;

// Rotas dinâmicas públicas, comparadas pelo início do caminho
const publicPrefixRoutes = [{ path: "/letter/", isAuth: "next" }] as const;

// Nomes usados pelo Auth.js v5 (não os do NextAuth v4). Atrás de proxy o
// protocolo visto aqui pode não ser o que o Auth.js usou, então limpa os dois.
const SESSION_COOKIE_NAMES = [
  "authjs.session-token",
  "__Secure-authjs.session-token",
];

function redirectTo(request: NextRequest, pathname: string) {
  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = pathname;
  redirectUrl.search = "";
  return NextResponse.redirect(redirectUrl);
}

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute =
    publicRoutes.find((route) => route.path === path) ??
    publicPrefixRoutes.find((route) => path.startsWith(route.path));
  const token = await getToken({ req: request, secret: getAuthSecret() });

  if (!token) {
    return publicRoute ? NextResponse.next() : redirectTo(request, LOGIN_URL);
  }

  const isExpired = token.exp !== undefined && Date.now() > token.exp * 1000;
  if (isExpired) {
    const response = redirectTo(request, LOGIN_URL);
    for (const name of SESSION_COOKIE_NAMES) response.cookies.delete(name);
    return response;
  }

  if (publicRoute?.isAuth === "redirect") {
    return redirectTo(request, "/dashboard");
  }

  return NextResponse.next();
}

export const config: ProxyConfig = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\.(?:png|svg|ico|jpg|jpeg|webp)$).*)"],
};
