'use client';

type MetaDisc = { nome: string; c: number; e: number; b: number };

export type TableRow = {
  data: string;
  nota: number;
  acertos: number;
  erros: number;
  brancos: number;
  max: number;
  metas?: MetaDisc[]; // opcional
};

export default function SimuladosTable({ rows }: { rows: TableRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-text/60">
            <th className="py-2 pr-4">Data</th>
            <th className="py-2 pr-4">Nota</th>
            <th className="py-2 pr-4">Acertos</th>
            <th className="py-2 pr-4">Erros</th>
            <th className="py-2 pr-4">Em branco</th>
            <th className="py-2 pr-4">Pont. máx</th>
            <th className="py-2 pr-4">Matéria 1 (c/e/b)</th>
            <th className="py-2 pr-4">Matéria 2 (c/e/b)</th>
            <th className="py-2 pr-0">Matéria 3 (c/e/b)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-borderc">
              <td className="py-2 pr-4">{r.data}</td>
              <td className="py-2 pr-4">{r.nota}</td>
              <td className="py-2 pr-4">{r.acertos}</td>
              <td className="py-2 pr-4">{r.erros}</td>
              <td className="py-2 pr-4">{r.brancos}</td>
              <td className="py-2 pr-4">{r.max}</td>

              {Array.from({ length: 3 }).map((_, idx) => {
                const m = r.metas?.[idx];
                const texto = m ? `${m.nome}: ${m.c}/${m.e}/${m.b}` : '—';
                return (
                  <td key={idx} className={idx < 2 ? 'py-2 pr-4' : 'py-2 pr-0'}>
                    {texto}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
