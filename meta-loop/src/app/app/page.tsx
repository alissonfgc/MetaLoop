'use client';

import { Trophy, Clock, CheckCircle2 } from 'lucide-react';

export default function AppHome() {
  return (
    <div className="max-w-7xl mx-auto grid gap-4">
      <section className="bg-card border border-borderc rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Bem-vindo ao MetaLoop</h2>
          <span className="text-xs text-text/60">Iniciada: 01/10</span>
        </div>
        <div className="mt-3">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Meta da semana</span>
            <span className="text-sm text-text/70">28%</span>
          </div>
          <div className="h-3 bg-background border border-borderc rounded-xl overflow-hidden">
            <div className="h-full bg-primary" style={{ width: '28%' }} />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI title="Aproveitamento" value="0,0%" Icon={Trophy} />
        <KPI title="Horas estudadas" value="00h00m" Icon={Clock} />
        <KPI title="Questões resolvidas" value="0" Icon={CheckCircle2} />
        <KPI title="Média (7d)" value="00h00m" Icon={Clock} />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-card border border-borderc rounded-2xl p-4 lg:col-span-2">
          <h3 className="font-semibold mb-3">Minhas atividades</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[20, 40, 65, 10].map((p, i) => (
              <div key={i} className="rounded-xl border border-borderc bg-background/40 p-3">
                <div className="text-sm font-medium">Atividade #{i + 1}</div>
                <div className="h-2 bg-background border border-borderc rounded mt-3 overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${p}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-card border border-borderc rounded-2xl p-4">
          <h3 className="font-semibold mb-3">Central</h3>
          <ul className="space-y-2 text-sm">
            {['Bem-vindo ao MetaLoop 🎉', 'Dica: registre seus estudos', 'Novidades em breve…'].map(
              (t, i) => (
                <li key={i} className="p-2 rounded-lg border border-borderc bg-background/30">
                  {t}
                </li>
              )
            )}
          </ul>
        </div>
      </section>
    </div>
  );
}

function KPI({ title, value, Icon }: { title: string; value: string; Icon: any }) {
  return (
    <div className="bg-card border border-borderc rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-text/70">{title}</div>
        <Icon size={18} className="text-text/60" />
      </div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
    </div>
  );
}
