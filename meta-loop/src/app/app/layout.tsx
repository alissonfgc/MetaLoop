'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import {
  Home, Target, BarChart2, ClipboardList, RefreshCw, BookOpen,
  LogOut, Play, Square, RotateCcw
} from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

const NAV = [
  { href: '/app', label: 'Home', icon: Home },
  { href: '/app/metas', label: 'Metas', icon: Target },
  { href: '/app/desempenho', label: 'Desempenho', icon: BarChart2 },
  { href: '/app/simulados', label: 'Simulados', icon: ClipboardList },
  { href: '/app/ciclo', label: 'Ciclo', icon: RefreshCw },
  { href: '/app/materiais', label: 'Materiais', icon: BookOpen },
];

function NavItem({ href, label, Icon }: { href: string; label: string; Icon: any }) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={`group relative flex items-center gap-3 rounded-xl px-3 py-2 transition-colors
        ${active ? 'bg-primary/10 text-text' : 'hover:bg-primary/10 text-text/80'}`}
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

/* --------- Timer simples (UI) --------- */
function TopbarTimer() {
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  function fmt(sec: number) {
    const h = Math.floor(sec / 3600).toString().padStart(2, '0');
    const m = Math.floor((sec % 3600) / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  }

  return (
    <div className="flex items-center gap-2 bg-background border border-borderc rounded-lg pl-2 pr-3 py-1.5">
      <button onClick={() => setRunning(true)} className="p-1 rounded hover:bg-primary/10" title="Iniciar">
        <Play size={16} />
      </button>
      <button onClick={() => setRunning(false)} className="p-1 rounded hover:bg-primary/10" title="Pausar">
        <Square size={16} />
      </button>
      <button onClick={() => { setSeconds(0); setRunning(false); }} className="p-1 rounded hover:bg-primary/10" title="Zerar">
        <RotateCcw size={16} />
      </button>
      <span className="tabular-nums font-medium">{fmt(seconds)}</span>
    </div>
  );
}

/* --------- Badge de continuidade (🔥 X dias) --------- */
function StreakBadge() {
  const [days, setDays] = useState<number>(0);
  useEffect(() => {
    // MVP: lê de localStorage; depois podemos calcular por RPC
    const raw = localStorage.getItem('streak_days');
    setDays(raw ? parseInt(raw, 10) || 0 : 0);
  }, []);
  return (
    <div className="hidden sm:flex items-center gap-2 rounded-full bg-background border border-borderc px-3 py-1.5">
      <span aria-hidden>🔥</span>
      <span className="text-sm">{days} dias</span>
    </div>
  );
}

/* --------- Menu do Perfil (avatar + dropdown com Sair) --------- */
function ProfileMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [initials, setInitials] = useState<string>('U');
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const name = (user?.user_metadata?.name as string | undefined) || user?.email || 'User';
      const init = name.trim().split(' ').map(p => p[0]?.toUpperCase()).slice(0, 2).join('') || 'U';
      setInitials(init);
    })();
  }, []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, [open]);

  async function signOut() {
    await supabase.auth.signOut();
    document.cookie = 'ml-session=; Path=/; Max-Age=0; SameSite=Lax';
    router.push('/');
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(o => !o)}
        className="h-9 w-9 rounded-full bg-background border border-borderc flex items-center justify-center font-semibold"
        aria-label="Abrir menu do usuário"
      >
        {initials}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-card border border-borderc rounded-xl shadow z-50">
          <button className="w-full text-left px-3 py-2 hover:bg-primary/10 rounded-t-xl">Perfil</button>
          <button className="w-full text-left px-3 py-2 hover:bg-primary/10">Suporte</button>
          <button
            onClick={signOut}
            className="w-full text-left px-3 py-2 text-error hover:bg-error/10 rounded-b-xl"
          >
            Sair
          </button>
        </div>
      )}
    </div>
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
            <NavItem key={n.href} href={n.href} label={n.label} Icon={n.icon} />
          ))}
        </nav>
        {/* ❌ Removemos o botão “Sair” daqui — agora fica no menu do perfil */}
      </aside>

      {/* Main column */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-16 bg-card border-b border-borderc flex items-center justify-between px-3 lg:px-4 gap-3">
          <div className="text-sm lg:text-base font-medium">Home</div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <TopbarTimer />
            <StreakBadge />
            <ProfileMenu />
          </div>
        </header>

        <main className="p-3 lg:p-4">{children}</main>
      </div>
    </div>
  );
}
