"use client";
import { AuthContextType } from "@/types/authContextType";
import { User } from "@/types/userType";
import { useSession } from "next-auth/react";
import { createContext } from "react";

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data } = useSession();

  const user: User | null = data?.user
    ? {
        id: data.user.id!,
        email: data.user.email!,
        name: data.user.name!,
      }
    : null;
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
