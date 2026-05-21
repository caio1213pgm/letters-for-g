import NextAuth from "next-auth";
import { authOptions } from "./lib/authConfig";

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
