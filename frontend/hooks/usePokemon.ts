"use client";

import { useState, useCallback } from "react";
import { Pokemon, PokemonFormData } from "@/types";
import { MOCK_POKEMON } from "@/data/mock";

export function usePokemon() {
  const [pokemon, setPokemon] = useState<Pokemon[]>(MOCK_POKEMON);

  const add = useCallback((data: PokemonFormData, userId: string): Pokemon => {
    const newPokemon: Pokemon = {
      ...data,
      id: String(Date.now()),
      types: data.types,
      imageUrl:
        data.imageUrl ||
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.pokedexNumber}.png`,
      createdBy: userId,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setPokemon((prev) => [newPokemon, ...prev]);
    return newPokemon;
  }, []);

  const update = useCallback((id: string, data: Partial<PokemonFormData>, userId: string): boolean => {
    setPokemon((prev) =>
      prev.map((p) => {
        if (p.id !== id || p.createdBy !== userId) return p;
        return {
          ...p,
          ...data,
          imageUrl:
            data.imageUrl ||
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.pokedexNumber ?? p.pokedexNumber}.png`,
        };
      })
    );
    return true;
  }, []);

  const remove = useCallback((id: string, userId: string): boolean => {
    const target = pokemon.find((p) => p.id === id);
    if (!target || target.createdBy !== userId) return false;
    setPokemon((prev) => prev.filter((p) => p.id !== id));
    return true;
  }, [pokemon]);

  return { pokemon, add, update, remove };
}
