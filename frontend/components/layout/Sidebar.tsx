"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, LogOut, User, Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Pokémon", icon: BookOpen },
];

function SidebarContent({ onNav }: { onNav?: () => void }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-6 border-b border-blue-600">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-full bg-pokemon-yellow flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-black text-pokemon-blue">PC</span>
          </div>
          <span className="text-white font-black text-sm tracking-wide uppercase">
            Pokémon Center
          </span>
        </div>
        <p className="text-blue-200 text-xs ml-10">Sistema de Gerenciamento</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={onNav}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
              pathname === href
                ? "bg-white text-pokemon-blue shadow-sm"
                : "text-blue-100 hover:bg-blue-600 hover:text-white"
            )}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-blue-600 space-y-2">
        <div className="flex items-center gap-2 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
            <User size={14} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-semibold truncate">{user?.name}</p>
            <p className="text-blue-300 text-[10px] capitalize">{user?.role}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 w-full px-3 py-2 text-blue-200 hover:text-white hover:bg-blue-600 rounded-xl text-sm transition-colors"
        >
          <LogOut size={16} />
          Sair
        </button>
      </div>
    </div>
  );
}

export function Sidebar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-56 bg-pokemon-blue flex-col z-40 shadow-xl">
        <SidebarContent />
      </aside>

      {/* Mobile hamburger button — floating, no top bar */}
      <button
        onClick={() => setDrawerOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-pokemon-blue rounded-xl flex items-center justify-center shadow-lg active:scale-95 transition-transform"
        aria-label="Abrir menu"
      >
        <Menu size={20} className="text-white" />
      </button>

      {/* Mobile drawer overlay */}
      {drawerOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="absolute left-0 top-0 h-full w-64 bg-pokemon-blue shadow-2xl animate-slideIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setDrawerOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-blue-200 hover:text-white hover:bg-blue-600 rounded-lg transition-colors"
              aria-label="Fechar menu"
            >
              <X size={18} />
            </button>
            <SidebarContent onNav={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
