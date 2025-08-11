'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import type { TooltipProps } from 'recharts';

type P = { acertos: number; erros: number; brancos: number };

const tooltipFormatter: TooltipProps<ValueType, NameType>['formatter'] = (value, name) => {
  return [value as number, name as string];
};

export default function DonutChart({ acertos, erros, brancos }: P) {
  const data = [
    { name: 'Acertos',  value: acertos,  color: 'var(--color-success)' },
    { name: 'Erros',    value: erros,    color: 'var(--color-error)' },
    { name: 'Em branco',value: brancos,  color: 'var(--color-warning)' },
  ];

  return (
    <div className="h-56 md:h-64 lg:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius="60%"
            outerRadius="85%"
            paddingAngle={2}
            dataKey="value"
            stroke="var(--color-card)"
            strokeWidth={2}
          >
            {data.map((d, i) => (
              <Cell key={i} fill={d.color as string} />
            ))}
          </Pie>
          <Tooltip
            formatter={tooltipFormatter}
            contentStyle={{
              background: 'var(--color-card)',
              border: '1px solid var(--color-borderc)',
              borderRadius: 12,
              fontSize: 12,
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
