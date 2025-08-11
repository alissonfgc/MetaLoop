'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Play, Square, RotateCcw } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import StreakPopover from '@/components/StreakPopover'; // ← usa o popover (abre expandido)
import { supabase } from '@/lib/supabaseClient';

/* ---------------- Timer no topbar ---------------- */
function TopbarTimer() {
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const raw = localStorage.getItem('ml_timer_seconds');
    if (raw) {
      const v = parseInt(raw, 10);
      if (!Number.isNaN(v)) setSeconds(v);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ml_timer_seconds', String(seconds));
  }, [seconds]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  const fmt = (sec: number) => {
    const h = Math.floor(sec / 3600).toString().padStart(2, '0');
    const m = Math.floor((sec % 3600) / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="flex items-center gap-2 bg-background border border-borderc rounded-lg pl-2 pr-3 py-1.5">
      <button onClick={() => setRunning(true)} className="p-1 rounded hover:bg-primary/10" title="Iniciar">
        <Play size={16} />
      </button>
      <button onClick={() => setRunning(false)} className="p-1 rounded hover:bg-primary/10" title="Pausar">
        <Square size={16} />
      </button>
      <button
        onClick={() => {
          setSeconds(0);
          setRunning(false);
        }}
        className="p-1 rounded hover:bg-primary/10"
        title="Zerar"
      >
        <RotateCcw size={16} />
      </button>
      <span className="tabular-nums font-medium" suppressHydrationWarning>
        {fmt(seconds)}
      </span>
    </div>
  );
}

/* ---------------- Menu do perfil ---------------- */
function ProfileMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [initials, setInitials] = useState('U');
  const [signingOut, setSigningOut] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      const name = (data.user?.user_metadata?.name as string | undefined) || data.user?.email || 'User';
      const init =
        name?.trim().split(' ').map((p) => p[0]?.toUpperCase()).slice(0, 2).join('') || 'U';
      setInitials(init);
    })();
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const signOut = async () => {
    try {
      setSigningOut(true);
      await supabase.auth.signOut();
      document.cookie = 'ml-session=; Path=/; Max-Age=0; SameSite=Lax';
      router.push('/');
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        ref={buttonRef}
        onClick={() => setOpen((o) => !o)}
        className="h-9 w-9 rounded-full bg-background border border-borderc flex items-center justify-center font-semibold"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Abrir menu do usuário"
      >
        {initials}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-44 bg-card border border-borderc rounded-xl shadow z-50 overflow-hidden"
        >
          <button role="menuitem" className="w-full text-left px-3 py-2 hover:bg-primary/10">Perfil</button>
          <button role="menuitem" className="w-full text-left px-3 py-2 hover:bg-primary/10">Suporte</button>
          <button
            role="menuitem"
            onClick={signOut}
            disabled={signingOut}
            className="w-full text-left px-3 py-2 text-error hover:bg-error/10 disabled:opacity-60"
          >
            {signingOut ? 'Saindo...' : 'Sair'}
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------------- Header ---------------- */
export default function HeaderClient() {
  return (
    <header className="h-16 bg-card border-b border-borderc flex items-center justify-between px-3 lg:px-4 gap-3">
      <div className="text-sm lg:text-base font-medium">Home</div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <TopbarTimer />
        <StreakPopover />  {/* ← agora abre expandido e notifica o header */}
        <ProfileMenu />
      </div>
    </header>
  );
}
