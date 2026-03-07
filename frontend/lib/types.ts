export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    createdAt: string;
  };
  access_token: string;
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
  owner?: {
    id: string;
    email: string;
  };
}

export interface CreatePokemonRequest {
  name: string;
  type: string;
  level: number;
  hp: number;
  pokedexNumber: number;
  imageUrl?: string;
}
