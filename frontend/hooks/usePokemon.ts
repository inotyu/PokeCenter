"use client";

import { useState, useCallback, useEffect } from "react";
import { Pokemon, PokemonFormData } from "@/types";
import { apiClient } from "@/lib/api";

export function usePokemon() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPokemon = useCallback(async (token: string) => {
    try {
      setLoading(true);
      console.log('Fetching Pokemon with token:', token ? 'token exists' : 'no token');
      const data = await apiClient.getPokemon(token);
      console.log('Pokemon data received:', data);
      setPokemon(data || []);
    } catch (error) {
      console.error('Error fetching pokemon:', error);
      // Não falhar completamente em caso de erro
      setPokemon([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const add = useCallback(async (data: PokemonFormData, token: string): Promise<Pokemon> => {
    try {
      const newPokemon = await apiClient.createPokemon(data, token);
      setPokemon((prev) => [newPokemon, ...prev]);
      return newPokemon;
    } catch (error) {
      console.error('Error adding pokemon:', error);
      throw error;
    }
  }, []);

  const update = useCallback(async (id: string, data: Partial<PokemonFormData>, token: string): Promise<boolean> => {
    try {
      await apiClient.updatePokemon(id, data, token);
      setPokemon((prev) =>
        prev.map((p) => {
          if (p.id === id) {
            return { ...p, ...data };
          }
          return p;
        })
      );
      return true;
    } catch (error) {
      console.error('Error updating pokemon:', error);
      return false;
    }
  }, []);

  const remove = useCallback(async (id: string, token: string): Promise<boolean> => {
    try {
      await apiClient.deletePokemon(id, token);
      setPokemon((prev) => prev.filter((p) => p.id !== id));
      return true;
    } catch (error) {
      console.error('Error deleting pokemon:', error);
      return false;
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('pokemon_token');
    if (token) {
      console.log('usePokemon: token available, fetching pokemon');
      fetchPokemon(token);
    } else {
      console.log('usePokemon: no token available');
    }
  }, [fetchPokemon]);

  return { pokemon, loading, add, update, remove, fetchPokemon };
}
