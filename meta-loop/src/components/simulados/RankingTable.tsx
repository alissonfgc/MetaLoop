export type RankRow = { pos: number; nome: string; nota: number };

export default function RankingTable({ rows }: { rows: RankRow[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-borderc">
      {/* Cabeçalho */}
      <div className="grid grid-cols-[80px_1fr_90px] bg-background/60 border-b border-borderc">
        <div className="px-3 py-2 font-medium">Posição</div>
        <div className="px-3 py-2 font-medium">Nome</div>
        <div className="px-3 py-2 font-medium text-right">Nota</div>
      </div>

      {/* Linhas */}
      <div className="divide-y divide-borderc">
        {rows.map((r) => (
          <div
            key={r.pos}
            className="grid grid-cols-[80px_1fr_90px] items-center"
          >
            <div className="px-3 py-3">{r.pos}º</div>
            <div className="px-3 py-3">{r.nome}</div>
            <div className="px-3 py-3 text-right font-semibold">{r.nota}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
