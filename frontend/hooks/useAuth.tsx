"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { User, AuthState } from "@/types";
import { apiClient } from "@/lib/api";

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string, role: User["role"]) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ 
    user: null, 
    isAuthenticated: false,
    token: null 
  });

  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await apiClient.login(email, password);
      
      if (response?.access_token) {
        setState({ 
          user: response?.user, 
          isAuthenticated: true,
          token: response?.access_token 
        });
        
        // Salvar token no localStorage
        localStorage.setItem('pokemon_token', response?.access_token);
        localStorage.setItem('pokemon_user', JSON.stringify(response?.user));
      }
      
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || 'Erro no login' };
    }
  }, []);

  const register = useCallback(
    async (name: string, email: string, password: string, role: User["role"]): Promise<{ success: boolean; error?: string }> => {
      try {
        const response = await apiClient.register(email, password);
        
        if (response?.access_token) {
          setState({ 
            user: response?.user, 
            isAuthenticated: true,
            token: response?.access_token 
          });
          
          // Salvar token no localStorage
          localStorage.setItem('pokemon_token', response?.access_token);
          localStorage.setItem('pokemon_user', JSON.stringify(response?.user));
          
          return { success: true };
        }
        return { success: false, error: 'Falha no registro' };
      } catch (error: any) {
        return { success: false, error: error.message || 'Erro ao criar conta' };
      }
    }, []
  );

  const logout = useCallback(() => {
    setState({ user: null, isAuthenticated: false, token: null });
    
    // Remover token do localStorage
    localStorage.removeItem('pokemon_token');
    localStorage.removeItem('pokemon_user');
  }, []);

  // Verificar token ao carregar
  useEffect(() => {
    const token = localStorage.getItem('pokemon_token');
    const userStr = localStorage.getItem('pokemon_user');

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        setState({
          user,
          isAuthenticated: true,
          token
        });
      } catch (error) {
        console.error('Error parsing user:', error);
        localStorage.removeItem('pokemon_token');
        localStorage.removeItem('pokemon_user');
      }
    }
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
