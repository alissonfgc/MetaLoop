'use client';

import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Home, Target, BarChart2, Clock, LogOut, Settings } from 'lucide-react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  async function signOut() {
    await supabase.auth.signOut();
    document.cookie = 'ml-session=; Path=/; Max-Age=0; SameSite=Lax';
    router.push('/');
  }

  return (
    <div className="min-h-screen bg-background text-text flex">
      {/* Sidebar */}
      <aside className="w-16 lg:w-64 bg-card border-r border-borderc">
        <div className="h-16 flex items-center justify-center lg:justify-start px-4 border-b border-borderc">
          <span className="font-semibold hidden lg:block">MetaLoop</span>
          <span className="lg:hidden text-xl">🌀</span>
        </div>
        <nav className="p-2 space-y-1">
          <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10">
            <Home size={18} /> <span className="hidden lg:inline">Início</span>
          </a>
          <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10">
            <Target size={18} /> <span className="hidden lg:inline">Metas</span>
          </a>
          <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10">
            <BarChart2 size={18} /> <span className="hidden lg:inline">Desempenho</span>
          </a>
          <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10">
            <Settings size={18} /> <span className="hidden lg:inline">Configurações</span>
          </a>

          <button
            onClick={signOut}
            className="mt-2 w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-error/10 text-error"
          >
            <LogOut size={18} /> <span className="hidden lg:inline">Sair</span>
          </button>
        </nav>
      </aside>

      {/* Área principal */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-16 bg-card border-b border-borderc flex items-center justify-between px-4">
          <h1 className="font-semibold">Dashboard</h1>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-background border border-borderc rounded-lg px-3 py-1.5">
              <Clock size={16} />
              <span className="text-sm">00:00:00</span>
            </div>
          </div>
        </header>

        {/* Conteúdo */}
        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
