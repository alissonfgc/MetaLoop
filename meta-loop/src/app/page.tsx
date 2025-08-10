'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

export default function Page() {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [show, setShow] = useState(false);
  const [err, setErr] = useState<string|null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!email || !pwd) return setErr('Informe e-mail e senha.');
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password: pwd });
    setLoading(false);
    if (error) return setErr('Não foi possível entrar. Verifique e-mail e senha.');
    window.location.href = '/app';
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h1 className="text-xl font-semibold">Entrar no MetaLoop</h1>
        <p className="text-slate-500 text-sm mb-4">Contas criadas manualmente.</p>

        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="text-sm">E-mail</label>
            <input
              type="email" value={email} onChange={e=>setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border px-3 py-2"
              placeholder="voce@exemplo.com"
            />
          </div>
          <div>
            <label className="text-sm">Senha</label>
            <div className="relative mt-1">
              <input
                type={show ? 'text' : 'password'}
                value={pwd} onChange={e=>setPwd(e.target.value)}
                className="w-full rounded-xl border px-3 py-2 pr-10"
                placeholder="••••••••"
              />
              <button type="button" onClick={()=>setShow(s=>!s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-600">
                {show ? <EyeOff size={18}/> : <Eye size={18}/>}
              </button>
            </div>
          </div>

          {err && <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">{err}</div>}

          <button disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 text-white px-4 py-2.5 font-medium">
            {loading && <Loader2 className="animate-spin" size={18} />}
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </main>
  );
}
