"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const ok = await login(email, password);
    setLoading(false);
    if (ok) {
      router.push("/dashboard");
    } else {
      setError("E-mail ou senha incorretos.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-pokemon-blue rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-2xl font-black text-pokemon-yellow">PC</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900">Pokémon Center</h1>
          <p className="text-gray-500 text-sm mt-1">Acesso restrito a treinadores autorizados</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="E-mail"
              type="email"
              placeholder="ash@pokemon.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Senha"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 rounded-lg px-3 py-2 text-sm">
                <AlertCircle size={14} />
                {error}
              </div>
            )}

            <Button type="submit" size="lg" loading={loading} className="w-full">
              Entrar
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            Não tem conta?{" "}
            <Link href="/register" className="text-pokemon-blue font-semibold hover:underline">
              Registrar-se
            </Link>
          </p>
        </div>

        <div className="mt-4 bg-blue-50 rounded-xl p-3 text-xs text-blue-700 border border-blue-100">
          <p className="font-bold mb-1">Credenciais de teste:</p>
          <p>ash@pokemon.com / pikachu123</p>
          <p>oak@pokemon.com / research123</p>
          <p>misty@pokemon.com / starmie123</p>
        </div>
      </div>
    </div>
  );
}
