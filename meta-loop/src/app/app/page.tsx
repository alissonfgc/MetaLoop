'use client';

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Trophy, Clock, CheckCircle2 } from 'lucide-react';

/** Tipos “MVP” — ajuste depois conforme o schema real */
type Goal = {
  id: string;
  name: string;
  progress_pct: number;        // 0–100
  total_activities: number;
  started_at: string;          // ISO
};

type Stats = {
  performance_pct: number;
  studied_minutes_today: number;
  questions_today: number;
  avg_daily_minutes_7d: number;
};

type Notice = { id: string; title: string };

export default function AppHome() {
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState<string>('');   // vindo do auth
  const [goal, setGoal] = useState<Goal | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [notices, setNotices] = useState<Notice[]>([]);

  // formatações
  const fmtHhMm = (mins: number) => {
    const h = Math.floor(mins / 60).toString().padStart(2, '0');
    const m = (mins % 60).toString().padStart(2, '0');
    return `${h}h${m}m`;
  };

  const startedLabel = useMemo(() => {
    if (!goal?.started_at) return '-';
    const d = new Date(goal.started_at);
    return d.toLocaleDateString('pt-BR');
  }, [goal]);

  useEffect(() => {
    (async () => {
      // 1) usuário
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        // middleware já protege, mas por via das dúvidas:
        window.location.href = '/';
        return;
      }
      const name = (user.user_metadata?.name as string | undefined) || user.email || 'MetaLoop';
      setFirstName(name.split(' ')[0]);

      // 2) dados (MVP: tenta buscar; se não existir tabela ainda, usa placeholders)
      try {
        // ajuste os nomes de tabelas conforme criar no banco
        const [{ data: g }, { data: s }, { data: n }] = await Promise.all([
          supabase
            .from('goals')
            .select('id,name,progress_pct,total_activities,started_at')
            .eq('user_id', user.id)
            .eq('status', 'active')
            .maybeSingle(),
          supabase
            .rpc('get_study_stats_today_and_avg', { p_user_id: user.id }) // EXEMPLO de RPC
            .single(), // { performance_pct, studied_minutes_today, questions_today, avg_daily_minutes_7d }
          supabase
            .from('notices')
            .select('id,title')
            .order('created_at', { ascending: false })
            .limit(3),
        ]);

        // FALLBACKS se as fontes acima não existirem ainda
        setGoal(
          g ?? {
            id: 'demo',
            name: 'Meta 12',
            progress_pct: 28,
            total_activities: 10,
            started_at: new Date().toISOString(),
          }
        );
        setStats(
          (s as Stats) ?? {
            performance_pct: 0,
            studied_minutes_today: 0,
            questions_today: 0,
            avg_daily_minutes_7d: 0,
          }
        );
        setNotices(
          (n as Notice[]) ?? [
            { id: '1', title: 'Bem-vindo ao MetaLoop! 🎉' },
            { id: '2', title: 'Dica: registre seus estudos diariamente.' },
            { id: '3', title: 'Novidades em breve…' },
          ]
        );
      } catch {
        // se der erro de tabela/RPC inexistente, usa placeholders
        setGoal({
          id: 'demo',
          name: 'Meta 12',
          progress_pct: 28,
          total_activities: 10,
          started_at: new Date().toISOString(),
        });
        setStats({
          performance_pct: 0,
          studied_minutes_today: 0,
          questions_today: 0,
          avg_daily_minutes_7d: 0,
        });
        setNotices([
          { id: '1', title: 'Bem-vindo ao MetaLoop! 🎉' },
          { id: '2', title: 'Dica: registre seus estudos diariamente.' },
          { id: '3', title: 'Novidades em breve…' },
        ]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto grid gap-4 p-4">
        <div className="h-28 bg-card border border-borderc rounded-2xl animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 bg-card border border-borderc rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto grid gap-4">
      {/* Saudação + meta atual */}
      <section className="bg-card border border-borderc rounded-2xl p-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-xl font-semibold">Oi, {firstName}</h2>
            <p className="text-sm text-text/70">
              Acompanhe seu progresso e veja o que falta para atingir sua meta.
            </p>
          </div>
          <div className="text-sm text-text/60">
            Iniciada: <span className="font-medium text-text/80">{startedLabel}</span>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <div className="font-medium">{goal?.name ?? 'Meta atual'}</div>
            <div className="text-sm text-text/70">{goal?.progress_pct ?? 0}%</div>
          </div>
          <div className="h-3 bg-background border border-borderc rounded-xl overflow-hidden">
            <div
              className="h-full bg-primary"
              style={{ width: `${goal?.progress_pct ?? 0}%` }}
            />
          </div>
          <div className="mt-2 text-xs text-text/70">
            {goal?.total_activities ?? 0} atividades
          </div>
        </div>
      </section>

      {/* KPIs */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CardKPI
          title="Seu desempenho"
          value={`${stats?.performance_pct ?? 0}%`}
          icon={<Trophy size={18} />}
        />
        <CardKPI
          title="Horas estudadas"
          value={fmtHhMm(stats?.studied_minutes_today ?? 0)}
          icon={<Clock size={18} />}
        />
        <CardKPI
          title="Questões resolvidas"
          value={`${stats?.questions_today ?? 0}`}
          icon={<CheckCircle2 size={18} />}
        />
        <CardKPI
          title="Média horas (7d)"
          value={fmtHhMm(stats?.avg_daily_minutes_7d ?? 0)}
          icon={<Clock size={18} />}
        />
      </section>

      {/* Listagens estilo “cards” */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-card border border-borderc rounded-2xl p-4 lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Minhas atividades</h3>
            <button className="text-sm px-3 py-1.5 rounded-lg border border-borderc bg-background hover:bg-primary/10">
              Ver todas
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-borderc bg-background/40 p-3">
                <div className="text-sm font-medium">Atividade #{i + 1}</div>
                <div className="text-xs text-text/70 mt-1">Disciplina • 20 min</div>
                <div className="h-2 bg-background border border-borderc rounded mt-3 overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${20 + i * 10}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-borderc rounded-2xl p-4">
          <h3 className="font-semibold mb-3">Central</h3>
          <ul className="space-y-2 text-sm">
            {notices.map(n => (
              <li key={n.id} className="p-2 rounded-lg border border-borderc bg-background/30">
                {n.title}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

/** Componentes de UI simples (tokens da paleta já aplicados) */
function CardKPI({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="bg-card border border-borderc rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-text/70">{title}</div>
        {icon && <div className="text-text/60">{icon}</div>}
      </div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
    </div>
  );
}
