import type { ComponentType } from 'react';

type IconType = ComponentType<{ size?: number; className?: string }>;

export default function StatCard({
  Icon,
  label,
  value,
}: {
  Icon: IconType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-borderc bg-background/60 p-3">
      <div className="flex items-center gap-2 text-text/70">
        <Icon size={16} />
        <span className="text-sm">{label}</span>
      </div>
      <div className="mt-2 text-2xl font-semibold tabular-nums">{value}</div>
    </div>
  );
}
