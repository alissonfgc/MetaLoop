'use client';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

export type LinePoint = { label: string; nota: number };

export default function LineNotas({ data }: { data: LinePoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 12, right: 16, bottom: 8, left: 0 }}>
        <CartesianGrid stroke="var(--color-primary)" strokeOpacity={0.25} />
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip
          contentStyle={{
            background: 'var(--color-card)',
            border: '1px solid var(--color-borderc)',
            borderRadius: 12,
            fontSize: 12,
          }}
        />
        <Line
          type="monotone"
          dataKey="nota"
          stroke="var(--color-primary)"
          strokeWidth={2}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
