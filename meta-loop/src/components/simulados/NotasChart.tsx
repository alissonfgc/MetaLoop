'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type P = { data: Array<{ nome: string; nota: number }> };

export default function NotasChart({ data }: P) {
  return (
    <div className="h-52">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="nome" stroke="currentColor" className="text-text/60" />
          <YAxis stroke="currentColor" className="text-text/60" />
          <Tooltip
            contentStyle={{ background: 'var(--color-card)', border: '1px solid var(--color-borderc)' }}
            labelStyle={{ color: 'var(--color-text)' }}
          />
          <Line
            type="monotone"
            dataKey="nota"
            stroke="var(--color-primary)"
            strokeWidth={2}
            dot={{ r: 3, stroke: 'var(--color-primary)', fill: 'var(--color-primary)' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
