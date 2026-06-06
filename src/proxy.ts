import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse, ProxyConfig } from "next/server";

const REDIRECTT_URL_ISN_AUTH = "/login";

const publicRoutes = [
  { path: "/login", isAuth: "redirect" },
  { path: "/register", isAuth: "redirect" },
  { path: "/", isAuth: "next" },
] as const;

export async function proxy(request: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET;
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === path);
  const token = await getToken({ req: request, secret });

  if (!token && publicRoute) {
    return NextResponse.next();
  }
  if (!token && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECTT_URL_ISN_AUTH;
    return NextResponse.redirect(redirectUrl);
  }

  if (token && publicRoute && publicRoute.isAuth === "redirect") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/dashboard";
    return NextResponse.redirect(redirectUrl);
  }

  if (token && !publicRoute) {
    const isExpired = Date.now() > token.exp! * 1000;
    if (isExpired) {
      console.log("expirou");
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/login";
      const sessionCookieName =
        process.env.NODE_ENV === "production"
          ? "__Secure-next-auth.session-token"
          : "next-auth.session-token";

      const response = NextResponse.redirect(redirectUrl);
      response.cookies.delete(sessionCookieName);
      return response;
    }
    return NextResponse.next();
  }
  return NextResponse.next();
}

export const config: ProxyConfig = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
