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
      const users = await apiClient.getUsers(token);
      setUsers(users || []);
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
