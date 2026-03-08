"use client";

import { Trash2 } from "lucide-react";
import { Pokemon } from "@/types";
import { Button } from "@/components/ui/Button";
import { formatPokedexNumber } from "@/lib/utils";

interface DeleteConfirmProps {
  pokemon: Pokemon;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export function DeleteConfirm({ pokemon, onConfirm, onCancel, loading }: DeleteConfirmProps) {
  return (
    <div className="text-center space-y-4">
      <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto">
        <Trash2 size={24} className="text-red-500" />
      </div>
      <div>
        <p className="text-gray-700 font-medium">
          Tem certeza que deseja excluir{" "}
          <span className="font-bold text-gray-900">{pokemon.name}</span>{" "}
          <span className="text-gray-400">{formatPokedexNumber(pokemon.pokedexNumber)}</span>?
        </p>
        <p className="text-sm text-gray-400 mt-1">Essa ação não pode ser desfeita.</p>
      </div>
      <div className="flex justify-center gap-3">
        <Button variant="secondary" onClick={onCancel}>Cancelar</Button>
        <Button variant="danger" onClick={onConfirm} loading={loading}>
          Excluir
        </Button>
      </div>
    </div>
  );
}
