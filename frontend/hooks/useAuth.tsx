"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { User, AuthState } from "@/types";
import { MOCK_USERS, TYPE_CREDENTIALS } from "@/data/mock";

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: User["role"]) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ user: null, isAuthenticated: false });

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 600));
    const expected = TYPE_CREDENTIALS[email];
    if (!expected || expected !== password) return false;
    const user = MOCK_USERS.find((u) => u.email === email);
    if (!user) return false;
    setState({ user, isAuthenticated: true });
    return true;
  }, []);

  const register = useCallback(
    async (name: string, email: string, _password: string, role: User["role"]): Promise<boolean> => {
      await new Promise((r) => setTimeout(r, 600));
      const newUser: User = { id: String(Date.now()), name, email, role };
      setState({ user: newUser, isAuthenticated: true });
      return true;
    },
    []
  );

  const logout = useCallback(() => {
    setState({ user: null, isAuthenticated: false });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
