import { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "text" },
      },
      async authorize(credentials) {
        console.log(credentials);
        const user = { id: 1, name: "admin", email: "admin@admin.com" };
        if (
          credentials.email !== "email@email.com" &&
          credentials.password !== "1234"
        ) {
          console.error("erro 124");
          return null;
        }
        console.log(user);
        return user;
      },
    }),
  ],
};

export { authOptions };
