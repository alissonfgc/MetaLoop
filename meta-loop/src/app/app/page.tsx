import type { Metadata } from "next";
import { Trophy, Clock, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Home — MetaLoop",
};

export default function AppHome() {
  return (
    <div className="min-h-screen bg-background p-6 lg:p-8">
      <div className="mx-auto w-full max-w-7xl space-y-6">
        {/* Breadcrumb / Título da página */}
        <div className="bg-card border border-borderc rounded-xl px-4 py-3">
          <div className="text-sm text-text/70">Home</div>
        </div>

        {/* Bem-vindo */}
        <section className="bg-card border border-borderc rounded-xl px-4 py-5">
          <h2 className="text-lg lg:text-xl font-semibold text-text">
            Bem-vindo ao MetaLoop
          </h2>
          <p className="mt-2 text-sm text-text/70">Meta da semana</p>
        </section>

        {/* KPIs */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border border-borderc rounded-xl p-5">
            <div className="flex items-center gap-2 text-text/80">
              <Trophy size={18} />
              <span className="text-sm">Aproveitamento</span>
            </div>
            <div className="mt-3 text-2xl font-semibold">0,0%</div>
          </div>

          <div className="bg-card border border-borderc rounded-xl p-5">
            <div className="flex items-center gap-2 text-text/80">
              <Clock size={18} />
              <span className="text-sm">Horas estudadas</span>
            </div>
            <div className="mt-3 text-2xl font-semibold tabular-nums">
              00h00m
            </div>
          </div>

          <div className="bg-card border border-borderc rounded-xl p-5">
            <div className="flex items-center gap-2 text-text/80">
              <CheckCircle2 size={18} />
              <span className="text-sm">Questões resolvidas</span>
            </div>
            <div className="mt-3 text-2xl font-semibold">0</div>
          </div>
        </section>

        {/* Colunas principais */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Minhas atividades */}
          <div className="bg-card border border-borderc rounded-xl p-5">
            <h3 className="text-base font-semibold text-text">
              Minhas atividades
            </h3>

            <div className="mt-4 space-y-3">
              {["Atividade #1", "Atividade #2", "Atividade #3", "Atividade #4"].map(
                (label) => (
                  <button
                    key={label}
                    type="button"
                    className="w-full rounded-lg border border-borderc px-4 py-3 text-left text-sm hover:bg-primary/5 transition-colors"
                  >
                    {label}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Central */}
          <div className="bg-card border border-borderc rounded-xl p-5">
            <h3 className="text-base font-semibold text-text">Central</h3>

            <div className="mt-4 space-y-3">
              <div className="rounded-lg border border-borderc px-4 py-3 text-sm">
                Bem-vindo ao MetaLoop 🎉
              </div>
              <div className="rounded-lg border border-borderc px-4 py-3 text-sm">
                Dica: registre seus estudos
              </div>
              <div className="rounded-lg border border-borderc px-4 py-3 text-sm">
                Novidades em breve...
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
