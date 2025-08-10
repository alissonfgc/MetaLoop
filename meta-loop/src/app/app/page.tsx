'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function AppHome() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        // sem sessão -> volta pro login
        window.location.href = '/';
        return;
      }
      setEmail(user.email ?? null);
      setLoading(false);
    })();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    // limpa cookie do guard simples (middleware)
    document.cookie = 'ml-session=; Path=/; Max-Age=0; SameSite=Lax';
    window.location.href = '/';
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background text-text">
        <div className="text-text/70">Carregando…</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-text p-6">
      <div className="max-w-3xl mx-auto bg-card border border-borderc rounded-2xl p-6 shadow">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">MetaLoop — Dashboard</h1>
          <button
            onClick={signOut}
            className="px-3 py-1.5 rounded bg-primary hover:bg-secondary text-white"
          >
            Sair
          </button>
        </div>

        <p className="text-text/70 mt-2">
          Logado como <span className="font-medium">{email}</span>.
        </p>

        <div className="mt-6 text-sm text-text/70">
          (MVP) Aqui vamos mostrar: minutos estudados hoje, questões feitas e metas.
        </div>
      </div>
    </main>
  );
}
