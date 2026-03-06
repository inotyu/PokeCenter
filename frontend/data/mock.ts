import { Pokemon, User } from "@/types";

export const MOCK_USERS: User[] = [
  { id: "1", name: "Ash Ketchum", email: "ash@pokemon.com", role: "trainer" },
  { id: "2", name: "Professor Oak", email: "oak@pokemon.com", role: "researcher" },
  { id: "3", name: "Misty", email: "misty@pokemon.com", role: "trainer" },
];

export const MOCK_POKEMON: Pokemon[] = [
  {
    id: "1", pokedexNumber: 25, name: "Pikachu",
    types: ["electric"], level: 35, hp: 90,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    createdBy: "1", createdAt: "2024-01-10",
  },
  {
    id: "2", pokedexNumber: 6, name: "Charizard",
    types: ["fire", "flying"], level: 65, hp: 180,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
    createdBy: "1", createdAt: "2024-01-11",
  },
  {
    id: "3", pokedexNumber: 151, name: "Mew",
    types: ["psychic"], level: 80, hp: 250,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png",
    createdBy: "2", createdAt: "2024-01-12",
  },
  {
    id: "4", pokedexNumber: 62, name: "Poliwrath",
    types: ["water", "fighting"], level: 50, hp: 160,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/62.png",
    createdBy: "2", createdAt: "2024-01-13",
  },
  {
    id: "5", pokedexNumber: 39, name: "Jigglypuff",
    types: ["normal", "fairy"], level: 20, hp: 115,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/39.png",
    createdBy: "3", createdAt: "2024-01-14",
  },
  {
    id: "6", pokedexNumber: 131, name: "Lapras",
    types: ["water", "ice"], level: 45, hp: 200,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/131.png",
    createdBy: "3", createdAt: "2024-01-15",
  },
  {
    id: "7", pokedexNumber: 144, name: "Articuno",
    types: ["ice", "flying"], level: 70, hp: 195,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/144.png",
    createdBy: "1", createdAt: "2024-01-16",
  },
  {
    id: "8", pokedexNumber: 94, name: "Gengar",
    types: ["ghost", "poison"], level: 55, hp: 150,
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png",
    createdBy: "2", createdAt: "2024-01-17",
  },
];

export const TYPE_CREDENTIALS: Record<string, string> = {
  "ash@pokemon.com": "pikachu123",
  "oak@pokemon.com": "research123",
  "misty@pokemon.com": "starmie123",
};
