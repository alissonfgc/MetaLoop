'use client';

export default function AppHome() {
  return (
    <div className="max-w-6xl mx-auto grid gap-4">
      {/* Linha 1: Saudação + Meta atual + Próxima meta */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <section className="bg-card border border-borderc rounded-2xl p-4">
          <h2 className="font-semibold mb-2">Olá! 👋</h2>
          <p className="text-sm text-text/70">
            Bem-vindo ao MetaLoop. Continue sua jornada e acompanhe seu progresso.
          </p>
        </section>

        <section className="bg-card border border-borderc rounded-2xl p-4 lg:col-span-2">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold">Meta atual</h2>
            <span className="text-xs text-text/60">Iniciada: 01/10</span>
          </div>
          <div className="h-3 bg-background border border-borderc rounded-xl overflow-hidden">
            <div className="h-full bg-primary" style={{ width: '28%' }} />
          </div>
          <div className="mt-2 text-xs text-text/70">28% de 10 atividades</div>
        </section>
      </div>

      {/* Linha 2: KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CardKPI title="Seu desempenho" value="0,0%" note="-" />
        <CardKPI title="Horas estudadas" value="00h00m" note="Hoje" />
        <CardKPI title="Questões resolvidas" value="0" note="Hoje" />
        <CardKPI title="Média diária" value="00h00m" note="Últimos 7d" />
      </div>

      {/* Linha 3: Listas (placeholder) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <section className="bg-card border border-borderc rounded-2xl p-4 lg:col-span-2">
          <h3 className="font-semibold mb-3">Minhas turmas</h3>
          <div className="h-28 rounded-xl border border-borderc bg-background/30" />
        </section>

        <section className="bg-card border border-borderc rounded-2xl p-4">
          <h3 className="font-semibold mb-3">Central</h3>
          <ul className="space-y-2 text-sm">
            <li className="p-2 rounded-lg border border-borderc bg-background/30">Aviso 1</li>
            <li className="p-2 rounded-lg border border-borderc bg-background/30">Aviso 2</li>
            <li className="p-2 rounded-lg border border-borderc bg-background/30">Aviso 3</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

function CardKPI({ title, value, note }: { title: string; value: string; note: string }) {
  return (
    <div className="bg-card border border-borderc rounded-2xl p-4">
      <div className="text-sm text-text/70">{title}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
      <div className="text-xs text-text/60 mt-2">{note}</div>
    </div>
  );
}
