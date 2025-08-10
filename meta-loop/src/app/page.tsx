'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

export default function Page() {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [show, setShow] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    if (!email || !pwd) {
      setErr('Informe e-mail e senha.');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password: pwd });
    setLoading(false);

    if (error) {
      setErr('Não foi possível entrar. Verifique e-mail e senha.');
      return;
    }

    // ✅ guarda sessão leve para o middleware (MVP)
    document.cookie = 'ml-session=1; Path=/; Max-Age=2592000; SameSite=Lax';

    // redireciona para a rota original (se houver) ou /app
    const params = new URLSearchParams(window.location.search);
    const to = params.get('redirectTo') || '/app';
    window.location.href = to;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md bg-card text-text rounded-2xl shadow border border-borderc p-6">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>

        <h1 className="text-xl font-semibold">Entrar no MetaLoop</h1>
        <p className="text-text/70 text-sm mb-4">Contas criadas manualmente.</p>

        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="text-sm">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-borderc bg-card
                         placeholder:text-text/50 text-text
                         focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                         px-3 py-2"
              placeholder="voce@exemplo.com"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="text-sm">Senha</label>
            <div className="relative mt-1">
              <input
                type={show ? 'text' : 'password'}
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                className="w-full rounded-xl border border-borderc bg-card
                           placeholder:text-text/50 text-text
                           focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                           px-3 py-2 pr-10"
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-text/60 hover:text-text/80"
                aria-label={show ? 'Esconder senha' : 'Mostrar senha'}
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {err && (
            <div className="text-sm text-white bg-error/90 rounded-xl px-3 py-2">
              {err}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl
                       bg-primary hover:bg-secondary text-white px-4 py-2.5 font-medium shadow
                       disabled:opacity-60"
          >
            {loading && <Loader2 className="animate-spin" size={18} />}
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </main>
  );
}
