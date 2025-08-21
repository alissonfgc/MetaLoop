import type { Metadata } from 'next';
import SimuladosClient from '@/components/simulados/SimuladosClient';
import type { TableRow } from '@/components/simulados/SimuladosTable';

export const metadata: Metadata = { title: 'Simulados — MetaLoop' };

export default function Page() {
  // Tabela com metas por linha
  const tabela: TableRow[] = [
    {
      data: '12/07/2025', nota: 55, acertos: 28, erros: 17, brancos: 10, max: 80,
      metas: [
        { nome: 'Mat 1', c: 12, e: 4, b: 2 },
        { nome: 'Mat 2', c: 9,  e: 5, b: 1 },
        { nome: 'Mat 3', c: 7,  e: 8, b: 7 },
      ],
    },
    {
      data: '26/07/2025', nota: 53, acertos: 27, erros: 19, brancos: 9, max: 80,
      metas: [
        { nome: 'Mat 1', c: 11, e: 6, b: 2 },
        { nome: 'Mat 2', c: 8,  e: 7, b: 4 },
        { nome: 'Mat 3', c: 8,  e: 6, b: 3 },
      ],
    },
    {
      data: '09/08/2025', nota: 49, acertos: 25, erros: 20, brancos: 10, max: 80,
      metas: [
        { nome: 'Mat 1', c: 10, e: 7, b: 3 },
        { nome: 'Mat 2', c: 7,  e: 8, b: 5 },
        { nome: 'Mat 3', c: 8,  e: 5, b: 2 },
      ],
    },
    {
      data: '23/08/2025', nota: 44, acertos: 23, erros: 21, brancos: 11, max: 80,
      metas: [
        { nome: 'Mat 1', c: 9,  e: 8, b: 4 },
        { nome: 'Mat 2', c: 7,  e: 7, b: 7 },
        { nome: 'Mat 3', c: 7,  e: 6, b: 0 },
      ],
    },
  ];

  const lineData = [
    { label: 'Sim 1', nota: 32 },
    { label: 'Sim 2', nota: 36 },
    { label: 'Sim 3', nota: 44 },
    { label: 'Sim 4', nota: 41 },
  ];

  const donut = { acertos: 118, erros: 77, brancos: 40 };

  const ranking = [
    { pos: 1, nome: 'Fulano', nota: 55 },
    { pos: 2, nome: 'Ciclano', nota: 53 },
    { pos: 3, nome: 'Beltrano', nota: 49 },
    { pos: 4, nome: 'João', nota: 44 },
  ];

  const kpis = { feitos: tabela.length, mediaNota: 50.3, totalQuestoes: 220, melhorNota: 55 };

  return (
    <div className="space-y-4">
      <div className="text-sm lg:text-base font-medium">Home</div>
      <SimuladosClient
        tabela={tabela}
        lineData={lineData}
        donut={donut}
        ranking={ranking}
        kpis={kpis}
      />
    </div>
  );
}
