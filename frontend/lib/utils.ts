import { PokemonType } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const TYPE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  fire:     { bg: "bg-orange-100", text: "text-orange-700", border: "border-orange-300" },
  water:    { bg: "bg-blue-100",   text: "text-blue-700",   border: "border-blue-300" },
  grass:    { bg: "bg-green-100",  text: "text-green-700",  border: "border-green-300" },
  electric: { bg: "bg-yellow-100", text: "text-yellow-700", border: "border-yellow-300" },
  psychic:  { bg: "bg-pink-100",   text: "text-pink-700",   border: "border-pink-300" },
  ice:      { bg: "bg-cyan-100",   text: "text-cyan-700",   border: "border-cyan-300" },
  fighting: { bg: "bg-red-100",    text: "text-red-700",    border: "border-red-300" },
  poison:   { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-300" },
  ground:   { bg: "bg-amber-100",  text: "text-amber-700",  border: "border-amber-300" },
  flying:   { bg: "bg-indigo-100", text: "text-indigo-700", border: "border-indigo-300" },
  bug:      { bg: "bg-lime-100",   text: "text-lime-700",   border: "border-lime-300" },
  rock:     { bg: "bg-stone-100",  text: "text-stone-700",  border: "border-stone-300" },
  ghost:    { bg: "bg-violet-100", text: "text-violet-700", border: "border-violet-300" },
  dragon:   { bg: "bg-blue-100",   text: "text-blue-800",   border: "border-blue-400" },
  dark:     { bg: "bg-gray-200",   text: "text-gray-800",   border: "border-gray-400" },
  steel:    { bg: "bg-slate-100",  text: "text-slate-700",  border: "border-slate-300" },
  fairy:    { bg: "bg-rose-100",   text: "text-rose-600",   border: "border-rose-300" },
  normal:   { bg: "bg-gray-100",   text: "text-gray-600",   border: "border-gray-300" },
  // Tipos compostos para compatibilidade
  "fire/flying":    { bg: "bg-orange-100", text: "text-orange-700", border: "border-orange-300" },
  "grass/poison":   { bg: "bg-green-100",  text: "text-green-700",  border: "border-green-300" },
  "water/dark":     { bg: "bg-blue-100",   text: "text-blue-700",   border: "border-blue-300" },
  "dragon/ground":  { bg: "bg-blue-100",   text: "text-blue-800",   border: "border-blue-400" },
  "steel/psychic":  { bg: "bg-slate-100",  text: "text-slate-700",  border: "border-slate-300" },
  "rock/dark":      { bg: "bg-stone-100",  text: "text-stone-700",  border: "border-stone-300" },
};

export const TYPE_CARD_COLORS: Record<string, string> = {
  fire:     "from-orange-400 to-red-500",
  water:    "from-blue-400 to-cyan-500",
  grass:    "from-green-400 to-emerald-500",
  electric: "from-yellow-300 to-amber-400",
  psychic:  "from-pink-400 to-rose-500",
  ice:      "from-cyan-300 to-blue-400",
  fighting: "from-red-400 to-orange-500",
  poison:   "from-purple-400 to-violet-500",
  ground:   "from-amber-400 to-yellow-500",
  flying:   "from-indigo-300 to-blue-400",
  bug:      "from-lime-400 to-green-500",
  rock:     "from-stone-400 to-gray-500",
  ghost:    "from-violet-500 to-purple-600",
  dragon:   "from-blue-500 to-indigo-600",
  dark:     "from-gray-600 to-gray-800",
  steel:    "from-slate-400 to-gray-500",
  fairy:    "from-rose-300 to-pink-400",
  normal:   "from-gray-300 to-gray-400",
  // Tipos compostos
  "fire/flying":    "from-orange-400 to-red-500",
  "grass/poison":   "from-green-400 to-emerald-500",
};

export function formatPokedexNumber(n: number) {
  return `#${String(n).padStart(3, "0")}`;
}

export function getHpColor(hp: number, maxHp = 300) {
  const pct = (hp / maxHp) * 100;
  if (pct > 60) return "bg-green-500";
  if (pct > 30) return "bg-yellow-500";
  return "bg-red-500";
}
