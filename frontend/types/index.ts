export type PokemonType =
  | "fire" | "water" | "grass" | "electric" | "psychic" | "ice"
  | "fighting" | "poison" | "ground" | "flying" | "bug" | "rock"
  | "ghost" | "dragon" | "dark" | "steel" | "fairy" | "normal";

export interface Pokemon {
  id: string;
  pokedexNumber: number;
  name: string;
  types: PokemonType[];
  level: number;
  hp: number;
  imageUrl: string;
  createdBy: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "trainer" | "researcher";
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface PokemonFormData {
  name: string;
  types: PokemonType[];
  level: number;
  hp: number;
  pokedexNumber: number;
  imageUrl?: string;
}
