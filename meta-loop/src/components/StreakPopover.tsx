'use client';

import { useEffect, useMemo, useState } from 'react';

/**
 * MVP de Streak:
 * - Guarda em localStorage:
 *   - streak_days (número)
 *   - streak_record (número)
 *   - streak_last (ISO date YYYY-MM-DD)
 * - Botão "Marcar hoje" incrementa se não marcou ainda; se quebrou, reseta p/ 1.
 * - Mostra dias da semana com hoje destacado.
 */

const LS_KEYS = {
  days: 'streak_days',
  record: 'streak_record',
  last: 'streak_last',
} as const;

function isoToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}
function isoYesterday() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
}
function weekdayShort(idx: number) {
  // Começa em Segunda (como nos prints)
  return ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'][idx];
}
function weekIndexFromDate(d: Date) {
  // 0..6, começando em segunda
  const i = d.getDay(); // 0=Dom..6=Sáb
  return i === 0 ? 6 : i - 1;
}

export default function StreakPopover() {
  const [open, setOpen] = useState(false);
  const [days, setDays] = useState(0);
  const [record, setRecord] = useState(0);
  const [last, setLast] = useState<string | null>(null);

  // carrega
  useEffect(() => {
    const d = parseInt(localStorage.getItem(LS_KEYS.days) || '0', 10) || 0;
    const r = parseInt(localStorage.getItem(LS_KEYS.record) || '0', 10) || 0;
    const l = localStorage.getItem(LS_KEYS.last);
    setDays(d);
    setRecord(r);
    setLast(l);
  }, []);

  const todayISO = isoToday();
  const yesterdayISO = isoYesterday();

  const jaMarcouHoje = last === todayISO;

  function marcarHoje() {
    // Se já marcou, não faz nada
    if (jaMarcouHoje) return;

    let nextDays = 1;
    if (last === yesterdayISO) {
      nextDays = days + 1;
    }

    const nextRecord = Math.max(record, nextDays);

    localStorage.setItem(LS_KEYS.days, String(nextDays));
    localStorage.setItem(LS_KEYS.record, String(nextRecord));
    localStorage.setItem(LS_KEYS.last, todayISO);

    setDays(nextDays);
    setRecord(nextRecord);
    setLast(todayISO);
  }

  // gera carrossel de 7 botões (sem lógica complexa de presença por data ainda)
  const weekButtons = useMemo(() => {
    const now = new Date();
    const todayIdx = weekIndexFromDate(now);
    return new Array(7).fill(0).map((_, idx) => {
      const label = weekdayShort(idx);
      const isToday = idx === todayIdx;
      // Preenchimento fake só para visual (preenche até o dia atual se já marcou hoje)
      const filled = isToday ? jaMarcouHoje : idx < todayIdx && days > 0;
      return { label, isToday, filled };
    });
  }, [days, jaMarcouHoje]);

  return (
    <div className="relative">
      {/* Badge compacto na topbar */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="hidden sm:flex items-center gap-2 rounded-full bg-background border border-borderc px-3 py-1.5 hover:bg-primary/10"
        aria-haspopup="dialog"
        aria-expanded={open}
        title="Sequência de estudos"
      >
        <span aria-hidden>🔥</span>
        <span className="text-sm">{days} dias</span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Sequência de estudos"
          className="absolute right-0 mt-2 w-[340px] bg-card border border-borderc rounded-2xl shadow-xl p-3 z-50"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="font-semibold">Meta diária</div>
            <button
              className="text-sm text-text/60 hover:text-text"
              onClick={() => setOpen(false)}
            >
              Fechar
            </button>
          </div>

          <div className="text-sm text-text/80">
            Mantenha o foco e estude diariamente.
          </div>

          <div className="mt-3 grid grid-cols-7 gap-2">
            {weekButtons.map((b, i) => (
              <button
                key={i}
                className={`text-xs px-0 py-1 rounded-lg border border-borderc
                  ${b.filled ? 'bg-primary/20' : 'bg-background'}
                  ${b.isToday ? 'ring-1 ring-primary' : ''}`}
                title={b.isToday ? 'Hoje' : undefined}
              >
                {b.label}
              </button>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between bg-background border border-borderc rounded-xl p-3">
            <div className="text-sm">
              <div className="text-text/70">Sequência atual</div>
              <div className="font-semibold">{days} dias</div>
            </div>
            <div className="text-sm">
              <div className="text-text/70">Seu recorde</div>
              <div className="font-semibold">{record} dias</div>
            </div>
          </div>

          <button
            onClick={marcarHoje}
            disabled={jaMarcouHoje}
            className={`mt-3 w-full rounded-xl px-4 py-2 font-medium border
              ${jaMarcouHoje
                ? 'bg-background border-borderc text-text/60 cursor-not-allowed'
                : 'bg-primary/10 border-primary/40 hover:bg-primary/20'}`}
          >
            {jaMarcouHoje ? 'Hoje já marcado ✅' : 'Marcar hoje'}
          </button>

          <div className="mt-2 text-[11px] text-text/60">
            MVP local. Depois vamos sincronizar com o Supabase (sequência, recorde, últimas marcações).
          </div>
        </div>
      )}
    </div>
  );
}
