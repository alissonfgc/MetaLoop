function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md bg-primary/15 border border-primary/30 px-2 py-[2px] text-[11px] font-medium">
      {children}
    </span>
  );
}

export default function TodayActivity({
  titulo,
  tipo,
  subtitulo,
  direita,
}: {
  titulo: string;
  tipo: 'Teoria' | 'Questões';
  subtitulo: string;
  direita?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-borderc bg-background/60 p-3">
      <div>
        <div className="flex items-center gap-2">
          <div className="font-semibold">{titulo}</div>
          <Pill>{tipo}</Pill>
        </div>
        <div className="mt-1 text-xs text-text/70 line-clamp-1">{subtitulo}</div>
      </div>
      <div className="flex items-center gap-2">{direita}</div>
    </div>
  );
}
