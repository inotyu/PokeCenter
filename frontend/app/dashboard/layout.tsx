"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Aguardar um pouco para o auth state ser inicializado
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (!isAuthenticated) {
        router.replace("/login");
      }
    }, 100); // Pequeno delay para permitir inicialização

    return () => clearTimeout(timer);
  }, [isAuthenticated, router]);

  // Mostrar loading enquanto verifica autenticação
  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex h-[100dvh] bg-gray-50 items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-pokemon-blue rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-2xl font-black text-pokemon-yellow">PC</span>
          </div>
          <p className="text-gray-500">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[100dvh] bg-gray-50 overflow-hidden">
      <Sidebar />
      <main className="flex-1 md:ml-56 h-full overflow-hidden">{children}</main>
    </div>
  );
}
