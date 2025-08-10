// src/app/app/page.tsx
import type { Metadata } from 'next';
import { Trophy, Clock, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'MetaLoop — App',
};

export default function AppHome() {
  return (
    <div className="mx-auto max-w-7xl space-y-4">
      {/* Breadcrumb / título */}
      <div className="bg-card border border-borderc rounded-2xl px-4 py-3">
        <div className="text-sm font-medium">Home</div>
      </div>

      {/* Bem-vindo + meta da semana */}
      <section className="bg-card border border-borderc rounded-2xl px-4 py-4">
        <h2 className="text-lg font-semibold">Bem-vindo ao MetaLoop</h2>
        <div className="mt-4 text-sm text-text/80">Meta da semana</div>
        <div className="mt-2 h-2 w-full rounded-full bg-borderc/40">
          <div className="h-2 w-[28%] rounded-full bg-primary/70" />
        </div>
      </section>

      {/* KPIs */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-borderc rounded-2xl px-4 py-4 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-text/80">
            <Trophy size={16} /> <span>Aproveitamento</span>
          </div>
          <div className="mt-2 text-2xl font-semibold">0,0%</div>
        </div>

        <div className="bg-card border border-borderc rounded-2xl px-4 py-4 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-text/80">
            <Clock size={16} /> <span>Horas estudadas</span>
          </div>
          <div className="mt-2 text-2xl font-semibold tabular-nums">00h00m</div>
        </div>

        <div className="bg-card border border-borderc rounded-2xl px-4 py-4 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-text/80">
            <CheckCircle2 size={16} /> <span>Questões resolvidas</span>
          </div>
          <div className="mt-2 text-2xl font-semibold">0</div>
        </div>
      </section>

      {/* Principal: esquerda 2/3 + direita 1/3 */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Esquerda */}
        <div className="lg:col-span-2 bg-card border border-borderc rounded-2xl p-4">
          <h3 className="text-base font-semibold">Minhas atividades</h3>

          {/* Itens AGORA com contraste real: bg-background (mais escuro que o card) + borda visível */}
          <div className="mt-4 space-y-3">
            <div className="rounded-xl border border-borderc/70 bg-background px-4 py-3 hover:bg-primary/5 transition">
              Atividade #1
            </div>
            <div className="rounded-xl border border-borderc/70 bg-background px-4 py-3 hover:bg-primary/5 transition">
              Atividade #2
            </div>
            <div className="rounded-xl border border-borderc/70 bg-background px-4 py-3 hover:bg-primary/5 transition">
              Atividade #3
            </div>
            <div className="rounded-xl border border-borderc/70 bg-background px-4 py-3 hover:bg-primary/5 transition">
              Atividade #4
            </div>
          </div>
        </div>

        {/* Direita */}
        <div className="bg-card border border-borderc rounded-2xl p-4">
          <h3 className="text-base font-semibold">Central</h3>

          <div className="mt-4 space-y-3">
            <div className="rounded-xl border border-borderc/70 bg-background px-4 py-3">
              Bem-vindo ao MetaLoop 🎉
            </div>
            <div className="rounded-xl border border-borderc/70 bg-background px-4 py-3">
              Dica: registre seus estudos
            </div>
            <div className="rounded-xl border border-borderc/70 bg-background px-4 py-3">
              Novidades em breve...
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
