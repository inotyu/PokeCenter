"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { User } from "@/types";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", role: "trainer" as User["role"] });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Nome é obrigatório";
    if (!form.email.includes("@")) e.email = "E-mail inválido";
    if (form.password.length < 6) e.password = "Mínimo 6 caracteres";
    if (form.password !== form.confirm) e.confirm = "As senhas não coincidem";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const ok = await register(form.name, form.email, form.password, form.role);
    setLoading(false);
    if (ok) router.push("/dashboard");
  }

  const field = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((p) => ({ ...p, [key]: e.target.value })),
    error: errors[key],
  });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-pokemon-blue rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-2xl font-black text-pokemon-yellow">PC</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900">Criar conta</h1>
          <p className="text-gray-500 text-sm mt-1">Registre-se como treinador ou pesquisador</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Nome completo" placeholder="Ash Ketchum" {...field("name")} />
            <Input label="E-mail" type="email" placeholder="ash@pokemon.com" {...field("email")} />

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-700">Função</label>
              <select
                value={form.role}
                onChange={(e) => setForm((p) => ({ ...p, role: e.target.value as User["role"] }))}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-pokemon-blue focus:ring-2 focus:ring-blue-100 transition-all bg-white"
              >
                <option value="trainer">Treinador</option>
                <option value="researcher">Pesquisador</option>
              </select>
            </div>

            <Input label="Senha" type="password" placeholder="••••••••" {...field("password")} />
            <Input label="Confirmar senha" type="password" placeholder="••••••••" {...field("confirm")} />

            <Button type="submit" size="lg" loading={loading} className="w-full">
              Criar conta
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            Já tem conta?{" "}
            <Link href="/login" className="text-pokemon-blue font-semibold hover:underline">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
