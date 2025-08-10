'use client';

export default function AppHome() {
  return (
    <div className="space-y-4">
      {/* breadcrumb/título da página */}
      <div className="bg-card border border-borderc rounded-2xl px-4 py-3">
        <div className="text-sm font-medium">Home</div>
      </div>

      {/* bloco: bem-vindo + meta/semana */}
      <section className="bg-card border border-borderc rounded-2xl p-4">
        <h2 className="text-lg font-semibold">Bem-vindo ao MetaLoop</h2>

        <div className="mt-4">
          <div className="text-sm mb-2">Meta da semana</div>
          <div className="h-2 w-full rounded-full bg-background/70 border border-borderc/60">
            <div className="h-full w-[28%] rounded-full bg-primary/70" />
          </div>
        </div>
      </section>

      {/* KPIs */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-borderc rounded-2xl p-4">
          <div className="text-sm text-text/70">Aproveitamento</div>
          <div className="mt-2 text-2xl font-semibold">0,0%</div>
        </div>

        <div className="bg-card border border-borderc rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-text/70">Horas estudadas</div>
          </div>
          <div className="mt-2 text-2xl font-semibold tabular-nums">00h00m</div>
        </div>

        <div className="bg-card border border-borderc rounded-2xl p-4">
          <div className="text-sm text-text/70">Questões resolvidas</div>
          <div className="mt-2 text-2xl font-semibold">0</div>
        </div>
      </section>

      {/* atividades + central */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Minhas atividades */}
        <div className="bg-card border border-borderc rounded-2xl p-4">
          <h3 className="text-base font-semibold">Minhas atividades</h3>

          <div className="mt-4 space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-xl border border-borderc p-3 bg-background/60"
              >
                <div className="text-sm font-medium">Atividade #{i}</div>
                <div className="mt-2 h-2 w-full rounded-full bg-card">
                  <div className="h-full w-[12%] rounded-full bg-primary/70" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Central */}
        <div className="bg-card border border-borderc rounded-2xl p-4">
          <h3 className="text-base font-semibold">Central</h3>

          <div className="mt-4 space-y-3">
            {[
              'Bem-vindo ao MetaLoop 🎉',
              'Dica: registre seus estudos',
              'Novidades em breve...',
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-borderc px-3 py-2 bg-background/50"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
