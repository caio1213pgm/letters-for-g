import bcrypt from "bcryptjs";
import { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getAuthSecret } from "./authSecret";
import { prisma } from "./prisma";

const authOptions: NextAuthConfig = {
  secret: getAuthSecret(),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "text" },
      },
      async authorize(credentials) {
        const email = credentials.email;
        const password = credentials.password;
        if (typeof email !== "string" || typeof password !== "string") {
          return null;
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
