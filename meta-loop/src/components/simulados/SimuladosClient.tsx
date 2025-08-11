'use client';

import dynamic from 'next/dynamic';
import SimuladosTable, { TableRow } from '@/components/simulados/SimuladosTable';
import RankingTable, { RankRow } from '@/components/simulados/RankingTable';
import AnalysisCard from '@/components/simulados/analysis/AnalysisCard';

// carregamos gráficos no cliente
const LineNotas = dynamic(() => import('@/components/simulados/LineNotas'), { ssr: false });
const DonutChart = dynamic(() => import('@/components/simulados/DonutChart'), { ssr: false });

export type LinePoint = { label: string; nota: number };

export default function SimuladosClient({
  tabela,
  lineData,
  donut,
  ranking,
  kpis,
}: {
  tabela: TableRow[];
  lineData: LinePoint[];
  donut: { acertos: number; erros: number; brancos: number };
  ranking: RankRow[];
  kpis: { feitos: number; mediaNota: number | string; totalQuestoes: number; melhorNota: number };
}) {
  return (
    <section className="space-y-6">
      {/* Meus simulados (tabela) */}
      <section className="bg-card border border-borderc rounded-2xl p-3 lg:p-4">
        <div className="text-lg font-semibold mb-3">Meus simulados</div>
        <SimuladosTable rows={tabela} />
      </section>

      {/* Grade principal do protótipo: esquerda (stats) x direita (ranking) */}
      <section className="grid grid-cols-1 xl:grid-cols-[2fr,1fr] gap-4 items-start">
        {/* COLUNA ESQUERDA (2fr) */}
        <div className="flex flex-col gap-4">
          {/* Estatísticas pessoais / Histórico de notas */}
          <div className="bg-card border border-borderc rounded-2xl p-3 lg:p-4">
            <div className="text-base font-semibold mb-3">Estatísticas pessoais</div>
            <div className="h-[260px]">
              <LineNotas data={lineData} />
            </div>
          </div>

          {/* Linha: Donut (Aproveitamento) + Análise da IA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Donut */}
            <div className="bg-card border border-borderc rounded-2xl p-3 lg:p-4">
              <div className="text-base font-semibold mb-3">Aproveitamento total</div>
              <div className="h-[260px]">
                <DonutChart
                  acertos={donut.acertos}
                  erros={donut.erros}
                  brancos={donut.brancos}
                />
              </div>
            </div>

            {/* Análise (mock) */}
            <AnalysisCard />
          </div>
        </div>

        {/* COLUNA DIREITA (1fr) — Ranking */}
        <div className="bg-card border border-borderc rounded-2xl p-3 lg:p-4">
          <div className="text-base font-semibold mb-3">Ranking dos alunos</div>
          <RankingTable rows={ranking} />
        </div>
      </section>
    </section>
  );
}
