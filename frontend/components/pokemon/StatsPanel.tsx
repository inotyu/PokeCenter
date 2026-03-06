"use client";

import Image from "next/image";
import { Pokemon } from "@/types";
import { TypeBadge } from "@/components/ui/TypeBadge";
import { TYPE_CARD_COLORS, formatPokedexNumber } from "@/lib/utils";
import { PokemonType } from "@/types";

interface StatsPanelProps {
  pokemon: Pokemon[];
}

export function StatsPanel({ pokemon }: StatsPanelProps) {
  const typeCounts = pokemon.reduce<Record<string, number>>((acc, p) => {
    p.types.forEach((t) => { acc[t] = (acc[t] ?? 0) + 1; });
    return acc;
  }, {});

  const topTypes = Object.entries(typeCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const featured = pokemon.slice(0, 2);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">
          Pokémon em Destaque
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-3">
          {featured.map((p) => (
            <div key={p.id} className="bg-white rounded-xl border border-gray-100 p-3 flex gap-3 items-center shadow-sm">
              <div className="w-14 h-14 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Image
                  src={p.imageUrl}
                  alt={p.name}
                  width={52}
                  height={52}
                  className="object-contain drop-shadow"
                  unoptimized
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-black text-gray-900 text-sm">{p.name}</span>
                  <span className="text-xs text-gray-400">{formatPokedexNumber(p.pokedexNumber)}</span>
                </div>
                <div className="flex gap-1 mt-1 flex-wrap">
                  {p.types.map((t) => <TypeBadge key={t} type={t} size="sm" />)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">
          Tipos no Centro
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-3 gap-2">
          {topTypes.map(([type, count]) => (
            <div
              key={type}
              className={`bg-gradient-to-br ${TYPE_CARD_COLORS[type as PokemonType]} rounded-xl p-2 flex flex-col items-center gap-1`}
            >
              <span className="text-white text-xs font-black capitalize">{type}</span>
              <span className="text-white/80 text-[10px]">{count} pkm</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">
          Estatísticas
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-0 sm:gap-4 md:gap-0">
          {[
            { label: "Total de Pokémon", value: pokemon.length },
            { label: "Nível médio", value: Math.round(pokemon.reduce((a, p) => a + p.level, 0) / (pokemon.length || 1)) },
            { label: "HP médio", value: Math.round(pokemon.reduce((a, p) => a + p.hp, 0) / (pokemon.length || 1)) },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between items-center py-1.5 border-b border-gray-50 sm:flex-col sm:items-start sm:border-0 sm:bg-gray-50 sm:rounded-xl sm:p-3 md:flex-row md:items-center md:border-b md:border-gray-50 md:bg-transparent md:rounded-none md:p-0 md:py-1.5">
              <span className="text-xs text-gray-500">{label}</span>
              <span className="text-sm font-bold text-gray-800">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
