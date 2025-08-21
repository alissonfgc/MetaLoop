// src/app/app/layout.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, Target, BarChart2, ClipboardList, RefreshCw, BookOpen } from 'lucide-react';
import HeaderClient from '@/components/HeaderClient';

export const metadata: Metadata = {
  title: 'MetaLoop — App',
};

type NavItem = { href: string; label: string; icon: React.ComponentType<{ size?: number; className?: string }> };

const NAV: NavItem[] = [
  { href: '/app', label: 'Home', icon: Home },
  { href: '/app/metas', label: 'Metas', icon: Target },
  { href: '/app/desempenho', label: 'Desempenho', icon: BarChart2 },
  { href: '/app/simulados', label: 'Simulados', icon: ClipboardList },
  { href: '/app/ciclo', label: 'Ciclo', icon: RefreshCw },
  { href: '/app/materiais', label: 'Materiais', icon: BookOpen },
];

function NavLink({ href, label, icon: Icon }: NavItem) {
  // Server Component -> Link simples; o active fica no client dentro do HeaderClient
  return (
    <Link
      href={href}
      className="group relative flex items-center gap-3 rounded-xl px-3 py-2 text-text/80 hover:text-text hover:bg-primary/10 transition-colors"
    >
      <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r bg-transparent group-hover:bg-primary/60" />
      <Icon size={18} />
      <span className="hidden lg:inline">{label}</span>
    </Link>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-text flex">
      {/* Sidebar */}
      <aside className="w-16 lg:w-64 bg-card border-r border-borderc flex flex-col">
        <div className="h-16 flex items-center justify-center lg:justify-start px-4 border-b border-borderc">
          <span className="font-semibold hidden lg:block">MetaLoop</span>
          <span className="lg:hidden text-xl">🌀</span>
        </div>
        <nav className="p-2 space-y-1 flex-1">
          {NAV.map((n) => (
            <NavLink key={n.href} {...n} />
          ))}
        </nav>
      </aside>

      {/* Coluna principal */}
      <div className="flex-1 flex flex-col">
        {/* Topbar com timer / tema / streak / perfil */}
        <HeaderClient />

        {/* IMPORTANTÍSSIMO: nada de max-w aqui. A própria página controla a largura */}
        <main className="px-3 lg:px-6 py-4">{children}</main>
      </div>
    </div>
  );
}
