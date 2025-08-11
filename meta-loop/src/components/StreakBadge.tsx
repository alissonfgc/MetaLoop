'use client';

import { useEffect, useState } from 'react';

function plural(n: number) {
  return n === 1 ? 'dia' : 'dias';
}

export default function StreakBadge() {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    // lê do localStorage (MVP)
    const raw = localStorage.getItem('streak_days');
    const value = raw ? parseInt(raw, 10) || 0 : 0;
    setDays(value);
  }, []);

  return (
    <div
      className="flex items-center gap-2 rounded-full bg-card border border-borderc px-3 py-1.5 text-sm"
      title="Sequência de estudos (MVP local)"
      // evita warning de hidratação enquanto o valor carrega
      suppressHydrationWarning
    >
      <span aria-hidden>🔥</span>
      <span>{days ?? 0} {plural(days ?? 0)}</span>
    </div>
  );
}
