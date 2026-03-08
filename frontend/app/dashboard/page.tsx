"use client";

import { useState, useMemo, useEffect } from "react";
import { Plus, BarChart2, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { usePokemon } from "@/hooks/usePokemon";
import { useToast } from "@/hooks/useToast";
import { useUsers } from "@/hooks/useUsers";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import { PokemonForm } from "@/components/pokemon/PokemonForm";
import { SearchBar } from "@/components/pokemon/SearchBar";
import { StatsPanel } from "@/components/pokemon/StatsPanel";
import { DeleteConfirm } from "@/components/pokemon/DeleteConfirm";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { ToastContainer } from "@/components/ui/Toast";
import { Pokemon, PokemonFormData, PokemonType } from "@/types";

export default function DashboardPage() {
  const { user, token } = useAuth();
  const { pokemon, loading, add, update, remove, fetchPokemon } = usePokemon();
  const { toasts, success, error } = useToast();
  const { getUserName } = useUsers();

  // Carregar Pokémon automaticamente quando o componente montar
  const [pokemonLoaded, setPokemonLoaded] = useState(false);

  useEffect(() => {
    if (token && !pokemonLoaded) {
      fetchPokemon(token);
      setPokemonLoaded(true);
    }
  }, [token, fetchPokemon, pokemonLoaded]);

  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState<PokemonType | "all">("all");
  const [addOpen, setAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Pokemon | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Pokemon | null>(null);
  const [saving, setSaving] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);

  const filtered = useMemo(() => {
    return pokemon.filter((p) => {
      const matchesQuery =
        !query ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        String(p.pokedexNumber).includes(query);
      const matchesType = selectedType === "all" || p.type.includes(selectedType);
      return matchesQuery && matchesType;
    });
  }, [pokemon, query, selectedType]);

  async function handleAdd(data: PokemonFormData) {
    if (!token) return;
    setSaving(true);
    try {
      await add(data, token);
      setAddOpen(false);
      success(`${data.name} adicionado com sucesso!`);
    } catch (err) {
      console.error('Error adding pokemon:', err);
      error(`Erro ao adicionar ${data.name}`);
    } finally {
      setSaving(false);
    }
  }

  async function handleEdit(data: PokemonFormData) {
    if (!editTarget || !token) return;
    setSaving(true);
    try {
      await update(editTarget.id, data, token);
      setEditTarget(null);
      success(`${editTarget.name} atualizado com sucesso!`);
    } catch (err) {
      console.error('Error updating pokemon:', err);
      error(`Erro ao atualizar ${editTarget.name}`);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget || !token) return;
    setSaving(true);
    try {
      await remove(deleteTarget.id, token);
      setDeleteTarget(null);
      success(`${deleteTarget.name} excluído com sucesso!`);
    } catch (err) {
      console.error('Error deleting pokemon:', err);
      error(`Erro ao excluir ${deleteTarget.name}`);
    } finally {
      setSaving(false);
    }
  }

  function getOwnerName(ownerId: string) {
  return getUserName(ownerId, user?.id);
}

  return (
    <div className="flex h-full overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <header className="bg-white border-b border-gray-100 px-4 md:px-8 py-3 md:py-4 flex-shrink-0 pl-16 md:pl-8">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div>
              <h1 className="text-xl md:text-2xl font-black text-gray-900">Pokémon&apos;s</h1>
              <p className="text-xs md:text-sm text-gray-500">
                {filtered.length} Pokémon{filtered.length !== pokemon.length && ` de ${pokemon.length}`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setStatsOpen(true)}
                className="md:hidden flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg text-xs font-semibold transition-colors"
              >
                <BarChart2 size={14} />
                Stats
              </button>
              <Button onClick={() => setAddOpen(true)} size="sm" className="md:hidden">
                <Plus size={14} />
                <span className="hidden xs:inline">Adicionar</span>
              </Button>
              <Button onClick={() => setAddOpen(true)} className="hidden md:flex">
                <Plus size={16} />
                Adicionar Pokémon
              </Button>
            </div>
          </div>
          <SearchBar
            query={query}
            onQueryChange={setQuery}
            selectedType={selectedType}
            onTypeChange={setSelectedType}
          />
        </header>

        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-4 md:py-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-48 text-gray-400">
              <p className="text-base md:text-lg font-bold">Buscando...</p>
              <p className="text-xs md:text-sm text-center">Carregando seus Pokémon</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-gray-400">
              <p className="text-base md:text-lg font-bold">Nenhum Pokémon encontrado</p>
              <p className="text-xs md:text-sm text-center">Tente ajustar os filtros ou adicione um novo Pokémon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 md:gap-4">
              {filtered.map((p) => (
                <PokemonCard
                  key={p.id}
                  pokemon={p}
                  ownerName={getOwnerName(p.ownerId)}
                  isOwner={p.ownerId === user?.id}
                  onEdit={setEditTarget}
                  onDelete={setDeleteTarget}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Desktop stats sidebar */}
      <aside className="hidden md:block w-72 flex-shrink-0 border-l border-gray-100 bg-white overflow-y-auto px-5 py-6">
        <StatsPanel pokemon={pokemon} />
      </aside>

      {/* Mobile stats drawer */}
      {statsOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={() => setStatsOpen(false)}
        >
          <div
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-5 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-black text-gray-900">Estatísticas</h2>
              <button
                onClick={() => setStatsOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>
            <StatsPanel pokemon={pokemon} />
          </div>
        </div>
      )}

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Adicionar Pokémon" size="lg">
        <PokemonForm onSubmit={handleAdd} onCancel={() => setAddOpen(false)} loading={saving} />
      </Modal>

      <Modal open={!!editTarget} onClose={() => setEditTarget(null)} title="Editar Pokémon" size="lg">
        {editTarget && (
          <PokemonForm
            initial={editTarget}
            onSubmit={handleEdit}
            onCancel={() => setEditTarget(null)}
            loading={saving}
          />
        )}
      </Modal>

      <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Confirmar exclusão" size="sm">
        {deleteTarget && (
          <DeleteConfirm
            pokemon={deleteTarget}
            onConfirm={handleDelete}
            onCancel={() => setDeleteTarget(null)}
            loading={saving}
          />
        )}
      </Modal>

      <ToastContainer toasts={toasts} onClose={(id) => {}} />
    </div>
  );
}
