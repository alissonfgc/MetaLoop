// src/app/app/metas/page.tsx

import { Clock, Trophy, CheckCircle2, ChartNoAxesColumn } from 'lucide-react';
import StatCard from '@/components/metas/StatCard';
import ProgressBar from '@/components/metas/ProgressBar';
import TodayActivity from '@/components/metas/TodayActivity';

export default async function MetasPage() {
  // ------------ Mock de dados (MVP) ------------
  const ciclo = {
    nome: 'Ciclo 3',
    progresso: 0.35, // 35%
    disciplinas: 6,
    atividades: 30,
    iniciadoEm: 'dd/mm/aaaa',
  };

  const stats = [
    { label: 'Horas estudadas', value: '11h 21m', icon: Clock },
    { label: 'Questões resolvidas', value: '112', icon: CheckCircle2 },
    { label: 'Seu desempenho', value: '67%', icon: ChartNoAxesColumn },
    { label: 'Média de horas diárias', value: '3h 37m', icon: Trophy },
  ] as const;

  const atividadesHoje = [
    {
      titulo: 'Língua Portuguesa',
      tipo: 'Teoria' as const,
      subtitulo: 'Interpretação de textos de gêneros variados',
      tempo: '1h 20m',
    },
    {
      titulo: 'Raciocínio Lógico',
      tipo: 'Teoria' as const,
      subtitulo: 'Modelagem de situações-problema',
      tempo: '1h 20m',
    },
    {
      titulo: 'Informática',
      tipo: 'Questões' as const,
      subtitulo: 'Conceito de internet e intranet',
      tempo: '0h 50m',
    },
    {
      titulo: 'Raciocínio Lógico',
      tipo: 'Questões' as const,
      subtitulo: 'Modelagem de situações-problema',
      tempo: '0h 50m',
    },
  ];

  const revisoesHoje = [
    {
      titulo: 'Informática',
      tipo: 'Questões' as const,
      subtitulo: 'Conceito de internet e intranet',
      qtdQuestoes: 30,
    },
  ];

  // ------------ UI ------------
  return (
    <div className="space-y-6">
      {/* Cabeçalho simples da página */}
      <div className="text-sm text-text/70">Metas</div>

      {/* Bloco: Ciclo atual */}
      <section className="rounded-2xl border border-borderc bg-card p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-lg font-semibold">Ciclo atual</div>
          <div className="text-xs text-text/60">Iniciado: {ciclo.iniciadoEm}</div>
        </div>

        {/* Barra de progresso + meta (Ciclo X) */}
        <div className="rounded-xl border border-borderc bg-background/60 p-3">
          <div className="mb-2 text-sm font-semibold">{ciclo.nome}</div>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <ProgressBar value={ciclo.progresso} />
            </div>
            <div className="w-16 text-right tabular-nums font-semibold">
              {Math.round(ciclo.progresso * 100)}%
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-4 text-xs text-text/70">
            <div>
              <span className="font-semibold">{ciclo.disciplinas}</span> Disciplinas
            </div>
            <div>
              <span className="font-semibold">{ciclo.atividades}</span> Atividades
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((s) => (
            <StatCard key={s.label} Icon={s.icon} label={s.label} value={s.value} />
          ))}
        </div>
      </section>

      {/* Bloco: Atividades de hoje + Revisões */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Atividades */}
        <div className="rounded-2xl border border-borderc bg-card p-4">
          <div className="mb-3 text-lg font-semibold">Atividades de hoje</div>

          {/* Banner informativo */}
          <div className="mb-3 rounded-xl border border-borderc bg-background/60 p-3 text-sm text-text/80">
            Você tem <span className="font-semibold">{atividadesHoje.length} atividades</span> para hoje
          </div>

          <div className="space-y-3">
            {atividadesHoje.map((a, idx) => (
              <TodayActivity
                key={idx}
                titulo={a.titulo}
                tipo={a.tipo}
                subtitulo={a.subtitulo}
                direita={
                  <>
                    <span className="rounded-md border border-borderc bg-background px-2 py-[2px] text-xs tabular-nums">
                      {a.tempo}
                    </span>
                    <button className="rounded-lg border border-primary/40 bg-primary/10 px-3 py-1 text-sm hover:bg-primary/20">
                      Registrar
                    </button>
                  </>
                }
              />
            ))}
          </div>
        </div>

        {/* Revisões */}
        <div className="rounded-2xl border border-borderc bg-card p-4">
          <div className="mb-3 text-lg font-semibold">Revisões de hoje</div>

          <div className="mb-3 rounded-xl border border-borderc bg-background/60 p-3 text-sm text-text/80">
            Você tem <span className="font-semibold">{revisoesHoje.length} revisão</span> para hoje
          </div>

          <div className="space-y-3">
            {revisoesHoje.map((r, idx) => (
              <TodayActivity
                key={idx}
                titulo={r.titulo}
                tipo={r.tipo}
                subtitulo={r.subtitulo}
                direita={
                  <>
                    <span className="rounded-md border border-borderc bg-background px-2 py-[2px] text-xs">
                      {r.qtdQuestoes} questões
                    </span>
                    <button className="rounded-lg border border-primary/40 bg-primary/10 px-3 py-1 text-sm hover:bg-primary/20">
                      Registrar
                    </button>
                  </>
                }
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
