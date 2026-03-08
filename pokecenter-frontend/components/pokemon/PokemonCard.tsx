"use client";

import Image from "next/image";
import { Pencil, Trash2, Shield } from "lucide-react";
import { Pokemon } from "@/types";
import { TypeBadge } from "@/components/ui/TypeBadge";
import { Button } from "@/components/ui/Button";
import { formatPokedexNumber, getHpColor } from "@/lib/utils";

interface PokemonCardProps {
  pokemon: Pokemon;
  ownerName?: string;
  isOwner: boolean;
  onEdit: (p: Pokemon) => void;
  onDelete: (p: Pokemon) => void;
}

export function PokemonCard({ pokemon, ownerName, isOwner, onEdit, onDelete }: PokemonCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex gap-3 md:gap-4 p-3 md:p-4 hover:shadow-md transition-shadow duration-200 animate-fadeIn">
      <div className="relative w-20 h-20 md:w-28 md:h-28 flex-shrink-0 bg-gray-50 rounded-xl flex items-center justify-center">
        <Image
          src={pokemon.imageUrl}
          alt={pokemon.name}
          width={100}
          height={100}
          className="object-contain drop-shadow-md"
          unoptimized
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="min-w-0">
            <h3 className="text-base md:text-xl font-black text-gray-900 leading-tight truncate">{pokemon.name}</h3>
            <span className="text-xs md:text-sm text-gray-400 font-semibold">
              {formatPokedexNumber(pokemon.pokedexNumber)}
            </span>
          </div>
          {isOwner && (
            <div className="flex gap-1 flex-shrink-0">
              <Button variant="ghost" size="sm" onClick={() => onEdit(pokemon)} className="p-1.5">
                <Pencil size={14} />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onDelete(pokemon)}
                className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50"
              >
                <Trash2 size={14} />
              </Button>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-1 mb-2 md:mb-3">
          <TypeBadge key={pokemon.type} type={pokemon.type as any} size="sm" />
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-1 mb-2 md:mb-3">
          <div>
            <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">Nível</span>
            <p className="text-xs md:text-sm font-bold text-gray-700">{pokemon.level}</p>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">HP</span>
            <div className="flex items-center gap-1.5 md:gap-2">
              <div className="flex-1 h-1.5 md:h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${getHpColor(pokemon.hp)}`}
                  style={{ width: `${Math.min((pokemon.hp / 300) * 100, 100)}%` }}
                />
              </div>
              <span className="text-xs font-bold text-gray-600">{pokemon.hp}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[10px] text-gray-400">
          <Shield size={10} />
          <span className="truncate">Criado por {ownerName ?? "Desconhecido"}</span>
        </div>
      </div>
    </div>
  );
}
