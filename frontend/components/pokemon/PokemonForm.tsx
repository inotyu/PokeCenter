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
    type: initial?.type ?? "",
    level: initial?.level ?? 1,
    hp: initial?.hp ?? 45,
    pokedexNumber: initial?.pokedexNumber ?? 1,
    imageUrl: initial?.imageUrl ?? "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof PokemonFormData, string>>>({});

  function toggleType(type: PokemonType) {
    setForm((prev) => ({
      ...prev,
      type: prev.type === type ? "" : type,
    }));
  }

  function validate(): boolean {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Nome é obrigatório";
    if (!form.type) e.type = "Selecione um tipo";
    if (form.level < 1 || form.level > 100) e.level = "Nível deve ser entre 1 e 100";
    if (form.hp < 1 || form.hp > 999) e.hp = "HP deve ser entre 1 e 999";
    if (form.pokedexNumber < 1 || form.pokedexNumber > 1000) e.pokedexNumber = "Número deve ser entre 1 e 1000";
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
          max={1000}
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
          max={999}
          value={form.hp}
          onChange={(e) => setForm((p) => ({ ...p, hp: Number(e.target.value) }))}
          error={errors.hp}
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-700 block mb-2">
          Tipo <span className="text-gray-400 font-normal">(selecione 1)</span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {ALL_TYPES.map((type) => {
            const selected = form.type === type;
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
        {errors.type && <p className="text-xs text-red-500 mt-1">{errors.type}</p>}
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
