'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ComponentType } from 'react';

type Props = {
  href: string;
  label: string;
  icon: ComponentType<{ size?: number; className?: string }>;
};

export default function AppNavLink({ href, label, icon: Icon }: Props) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`group relative flex items-center gap-3 rounded-xl px-3 py-2 transition-colors
        ${active ? 'bg-primary/10 text-text' : 'text-text/80 hover:bg-primary/10 hover:text-text'}`}
    >
      {/* Indicador de continuidade (barra à esquerda) */}
      <span
        className={`absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r
          ${active ? 'bg-primary' : 'bg-transparent group-hover:bg-primary/60'}`}
      />
      <Icon size={18} />
      <span className="hidden lg:inline">{label}</span>
    </Link>
  );
}
