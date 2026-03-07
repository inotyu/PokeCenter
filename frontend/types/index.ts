export type PokemonType =
  | "fire" | "water" | "grass" | "electric" | "psychic" | "ice"
  | "fighting" | "poison" | "ground" | "flying" | "bug" | "rock"
  | "ghost" | "dragon" | "dark" | "steel" | "fairy" | "normal"
  | "fire/flying" | "grass/poison" | "water/dark" | "dragon/ground" 
  | "steel/psychic" | "rock/dark";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "trainer" | "professor";
}

export interface Pokemon {
  id: string;
  name: string;
  type: string;
  level: number;
  hp: number;
  pokedexNumber: number;
  imageUrl: string;
  ownerId: string;
  createdAt: string;
}

export interface PokemonFormData {
  name: string;
  type: string;
  level: number;
  hp: number;
  pokedexNumber: number;
  imageUrl?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}
