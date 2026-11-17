import bcrypt from "bcryptjs";
import { CredentialsSignin, NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getClientIp } from "./clientIp";
import { prisma } from "./prisma";
import { consumeRateLimit, resetRateLimit } from "./rateLimit";

const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const MAX_LOGIN_ATTEMPTS_PER_EMAIL = 10;
const MAX_LOGIN_ATTEMPTS_PER_IP = 30;

export const RATE_LIMITED_CODE = "rate_limited";

// Erro com código próprio para o formulário distinguir "bloqueado" de "senha errada"
class RateLimitedSignin extends CredentialsSignin {
  code = RATE_LIMITED_CODE;
}

const authOptions: NextAuthConfig = {
  // Lido aqui sem lançar erro: este módulo é carregado durante o `next build`
  // (inclusive no Docker, onde o .env não existe). Sem segredo em runtime,
  // o próprio Auth.js responde com MissingSecret.
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "text" },
      },
      // O limite fica no authorize, e não na server action, porque o endpoint
      // /api/auth/callback/credentials também pode ser chamado diretamente
      async authorize(credentials, request) {
        const email = credentials.email;
        const password = credentials.password;
        if (typeof email !== "string" || typeof password !== "string") {
          return null;
        }

        const emailKey = `login:email:${email.trim().toLowerCase()}`;
        const ip = getClientIp(request.headers);
        const [emailState, ipState] = await Promise.all([
          consumeRateLimit(emailKey, LOGIN_WINDOW_MS),
          ip ? consumeRateLimit(`login:ip:${ip}`, LOGIN_WINDOW_MS) : null,
        ]);
        if (
          emailState.attempts > MAX_LOGIN_ATTEMPTS_PER_EMAIL ||
          (ipState && ipState.attempts > MAX_LOGIN_ATTEMPTS_PER_IP)
        ) {
          throw new RateLimitedSignin();
        }

        const user = await prisma.user.findUnique({
          where: { email },
          include: { credential: true },
        });

        if (!user?.credential) return null;

        const isValidPassword = await bcrypt.compare(
          password,
          user.credential.passwordHash,
        );

        if (!isValidPassword) return null;

        await resetRateLimit(emailKey);

        // Só o necessário vai para o JWT: nunca o hash da senha
        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

export { authOptions };
