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
  const [form, setForm] = useState({ email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.email.trim()) e.email = "E-mail é obrigatório";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "E-mail deve ser válido";
    if (form.password.length < 6) e.password = "Mínimo 6 caracteres";
    if (form.password !== form.confirm) e.confirm = "As senhas não coincidem";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const result = await register(form.email, form.password);
    setLoading(false);
    if (result.success) {
      router.push("/dashboard");
    } else {
      setErrors({ email: result.error || 'Erro ao criar conta' });
    }
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
            <Input label="E-mail" type="email" placeholder="ash@pokemon.com" {...field("email")} />

            <Input label="Senha" type="password" placeholder="Mínimo 6 caracteres" {...field("password")} />
            
            <Input label="Confirmar senha" type="password" placeholder="Repita sua senha" {...field("confirm")} />

            <Button type="submit" loading={loading} className="w-full">
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
