"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { PokemonType } from "@/types";
import { TYPE_COLORS } from "@/lib/utils";

interface SearchBarProps {
  query: string;
  onQueryChange: (q: string) => void;
  selectedType: PokemonType | "all";
  onTypeChange: (t: PokemonType | "all") => void;
}

const FILTER_TYPES: Array<PokemonType | "all"> = [
  "all", "fire", "water", "grass", "electric", "psychic",
  "ice", "fighting", "poison", "ghost", "dragon", "dark", "fairy", "flying",
  "fire/flying", "grass/poison", "water/dark", "dragon/ground", "steel/psychic", "rock/dark"
];

export function SearchBar({ query, onQueryChange, selectedType, onTypeChange }: SearchBarProps) {
  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar Pokémon..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl outline-none focus:border-pokemon-blue focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
        <div className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-500">
          <SlidersHorizontal size={16} />
        </div>
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide -mx-4 md:mx-0 px-4 md:px-0 md:flex-wrap">
        {FILTER_TYPES.map((type) => {
          const active = selectedType === type;
          const colors = type !== "all" ? TYPE_COLORS[type] : null;
          return (
            <button
              key={type}
              onClick={() => onTypeChange(type)}
              className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold border capitalize transition-all duration-150 ${
                active
                  ? colors
                    ? `${colors.bg} ${colors.text} ${colors.border} scale-105`
                    : "bg-pokemon-blue text-white border-pokemon-blue scale-105"
                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
              }`}
            >
              {type === "all" ? "Todos" : type}
            </button>
          );
        })}
      </div>
    </div>
  );
}
