"use client";

import { useState, useCallback, useEffect } from "react";
import { User } from "@/types";
import { apiClient } from "@/lib/api";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(async (token: string) => {
    try {
      setLoading(true);
      // Por enquanto, vamos usar os dados mockados
      // Futuramente podemos criar um endpoint /users no backend
      const mockUsers: User[] = [
        { id: "1", name: "Ash Ketchum", email: "ash@pokemon.com", role: "trainer" },
        { id: "2", name: "Professor Oak", email: "oak@pokemon.com", role: "professor" },
        { id: "3", name: "Misty", email: "misty@pokemon.com", role: "trainer" },
      ];
      setUsers(mockUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getUserName = useCallback((ownerId: string, currentUserId?: string) => {
    // Se for o usuário logado, mostra "Você"
    if (currentUserId && ownerId === currentUserId) {
      return "Você";
    }
    
    // Tenta encontrar na lista de usuários
    const user = users.find((u) => u.id === ownerId);
    return user?.name || "Desconhecido";
  }, [users]);

  return { users, loading, fetchUsers, getUserName };
}
