"use client";

import { useState, FormEvent } from "react";
import { Pokemon, PokemonFormData, PokemonType } from "@/types";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { TypeBadge } from "@/components/ui/TypeBadge";
import { TYPE_COLORS } from "@/lib/utils";

const ALL_TYPES = Object.keys(TYPE_COLORS) as PokemonType[];

interface PokemonFormProps {
  initial?: Pokemon;
  onSubmit: (data: PokemonFormData) => void;
  onCancel: () => void;
  loading?: boolean;
}

export function PokemonForm({ initial, onSubmit, onCancel, loading }: PokemonFormProps) {
  const [form, setForm] = useState<PokemonFormData>({
    name: initial?.name ?? "",
    types: initial?.types ?? [],
    level: initial?.level ?? 1,
    hp: initial?.hp ?? 45,
    pokedexNumber: initial?.pokedexNumber ?? 1,
    imageUrl: initial?.imageUrl ?? "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof PokemonFormData, string>>>({});

  function toggleType(type: PokemonType) {
    setForm((prev) => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter((t) => t !== type)
        : prev.types.length < 2
        ? [...prev.types, type]
        : prev.types,
    }));
  }

  function validate(): boolean {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Nome é obrigatório";
    if (form.types.length === 0) e.types = "Selecione ao menos um tipo";
    if (form.level < 1 || form.level > 100) e.level = "Nível deve ser entre 1 e 100";
    if (form.hp < 1) e.hp = "HP deve ser maior que 0";
    if (form.pokedexNumber < 1) e.pokedexNumber = "Número inválido";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          label="Nome"
          placeholder="Ex: Pikachu"
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          error={errors.name}
        />
        <Input
          label="Nº Pokédex"
          type="number"
          min={1}
          placeholder="Ex: 25"
          value={form.pokedexNumber}
          onChange={(e) => setForm((p) => ({ ...p, pokedexNumber: Number(e.target.value) }))}
          error={errors.pokedexNumber}
        />
        <Input
          label="Nível"
          type="number"
          min={1}
          max={100}
          value={form.level}
          onChange={(e) => setForm((p) => ({ ...p, level: Number(e.target.value) }))}
          error={errors.level}
        />
        <Input
          label="HP"
          type="number"
          min={1}
          value={form.hp}
          onChange={(e) => setForm((p) => ({ ...p, hp: Number(e.target.value) }))}
          error={errors.hp}
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-700 block mb-2">
          Tipos <span className="text-gray-400 font-normal">(máx. 2)</span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {ALL_TYPES.map((type) => {
            const selected = form.types.includes(type);
            return (
              <button
                key={type}
                type="button"
                onClick={() => toggleType(type)}
                className={`transition-all duration-150 rounded-full ${selected ? "ring-2 ring-offset-1 ring-pokemon-blue scale-105" : "opacity-60 hover:opacity-100"}`}
              >
                <TypeBadge type={type} size="sm" />
              </button>
            );
          })}
        </div>
        {errors.types && <p className="text-xs text-red-500 mt-1">{errors.types}</p>}
      </div>

      <Input
        label="URL da imagem (opcional)"
        placeholder="https://..."
        value={form.imageUrl ?? ""}
        onChange={(e) => setForm((p) => ({ ...p, imageUrl: e.target.value }))}
      />

      <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" loading={loading}>
          {initial ? "Salvar alterações" : "Adicionar Pokémon"}
        </Button>
      </div>
    </form>
  );
}
