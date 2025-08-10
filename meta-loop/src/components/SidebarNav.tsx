'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home, Target, BarChart2, ClipboardList, RefreshCw, BookOpen,
} from 'lucide-react';

type IconType = React.ComponentType<{ size?: number; className?: string }>;

const NAV: Array<{ href: string; label: string; icon: IconType }> = [
  { href: '/app', label: 'Home', icon: Home },
  { href: '/app/metas', label: 'Metas', icon: Target },
  { href: '/app/desempenho', label: 'Desempenho', icon: BarChart2 },
  { href: '/app/simulados', label: 'Simulados', icon: ClipboardList },
  { href: '/app/ciclo', label: 'Ciclo', icon: RefreshCw },
  { href: '/app/materiais', label: 'Materiais', icon: BookOpen },
];

function NavItem({ href, label, Icon }: { href: string; label: string; Icon: IconType }) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={`group relative flex items-center gap-3 rounded-xl px-3 py-2 transition-colors
        ${active ? 'bg-primary/10 text-text' : 'text-text/80 hover:bg-primary/10 hover:text-text'}`}
    >
      {/* indicador de continuidade (barra à esquerda) */}
      <span
        className={`absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r
          ${active ? 'bg-primary' : 'bg-transparent group-hover:bg-primary/60'}`}
      />
      <Icon size={18} />
      <span className="hidden lg:inline">{label}</span>
    </Link>
  );
}

export default function SidebarNav() {
  return (
    <aside className="w-16 lg:w-64 bg-card border-r border-borderc flex flex-col">
      <div className="h-16 flex items-center justify-center lg:justify-start px-4 border-b border-borderc">
        <span className="font-semibold hidden lg:block">MetaLoop</span>
        <span className="lg:hidden text-xl">🌀</span>
      </div>

      <nav className="p-2 space-y-1 flex-1">
        {NAV.map((n) => (
          <NavItem key={n.href} href={n.href} label={n.label} Icon={n.icon} />
        ))}
      </nav>
    </aside>
  );
}
