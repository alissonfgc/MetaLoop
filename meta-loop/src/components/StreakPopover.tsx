'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * MVP de Streak
 * localStorage:
 *  - streak_days (número)            <- principal
 *  - ml_streak_days (número)         <- compatibilidade
 *  - streak_record (número)
 *  - streak_last (YYYY-MM-DD)
 */

const LS_KEYS = {
  days: 'streak_days',
  daysCompat: 'ml_streak_days',
  record: 'streak_record',
  last: 'streak_last',
} as const;

function isoToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
}
function isoYesterday() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
}
function weekdayShort(i: number) {
  return ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'][i];
}
function weekIndexFromDate(d: Date) {
  const i = d.getDay(); // 0=Dom..6=Sáb
  return i === 0 ? 6 : i - 1; // segunda=0
}

function readDays(): number {
  const raw =
    localStorage.getItem(LS_KEYS.days) ??
    localStorage.getItem(LS_KEYS.daysCompat) ??
    '0';
  const v = parseInt(raw, 10);
  return Number.isNaN(v) ? 0 : v;
}
function writeDays(v: number) {
  localStorage.setItem(LS_KEYS.days, String(v));
  localStorage.setItem(LS_KEYS.daysCompat, String(v));
}

export default function StreakPopover() {
  const [open, setOpen] = useState(false);
  const [days, setDays] = useState(0);
  const [record, setRecord] = useState(0);
  const [last, setLast] = useState<string | null>(null);

  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [coords, setCoords] = useState<{top: number; left: number} | null>(null);
  const PANEL_W = 340; // px

  // carregar
  useEffect(() => {
    const d = readDays();
    const r = parseInt(localStorage.getItem(LS_KEYS.record) || '0', 10) || 0;
    const l = localStorage.getItem(LS_KEYS.last);
    setDays(d);
    setRecord(r);
    setLast(l);
  }, []);

  // recalcula posição quando abre / redimensiona / scroll
  useEffect(() => {
    function updatePos() {
      const el = btnRef.current;
      if (!open || !el) return;
      const r = el.getBoundingClientRect();
      const gap = 8;
      const top = r.bottom + gap;
      let left = r.right - PANEL_W; // alinha à direita do botão
      left = Math.max(8, Math.min(left, window.innerWidth - PANEL_W - 8));
      setCoords({ top, left });
    }
    if (open) {
      updatePos();
      window.addEventListener('resize', updatePos);
      window.addEventListener('scroll', updatePos, true);
      const closeOnEsc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
      const closeOnClickOutside = (e: MouseEvent) => {
        if (!btnRef.current) return;
        const panel = document.getElementById('streak-panel');
        const t = e.target as Node;
        if (panel && !panel.contains(t) && !btnRef.current.contains(t)) {
          setOpen(false);
        }
      };
      window.addEventListener('keydown', closeOnEsc);
      window.addEventListener('mousedown', closeOnClickOutside);

      return () => {
        window.removeEventListener('resize', updatePos);
        window.removeEventListener('scroll', updatePos, true);
        window.removeEventListener('keydown', closeOnEsc);
        window.removeEventListener('mousedown', closeOnClickOutside);
      };
    }
  }, [open]);

  const todayISO = isoToday();
  const yesterdayISO = isoYesterday();
  const jaMarcouHoje = last === todayISO;

  function notificarMudanca() {
    window.dispatchEvent(new Event('ml-streak-changed'));
  }

  function marcarHoje() {
    if (jaMarcouHoje) return;

    let nextDays = 1;
    if (last === yesterdayISO) nextDays = days + 1;

    const nextRecord = Math.max(record, nextDays);

    writeDays(nextDays);
    localStorage.setItem(LS_KEYS.record, String(nextRecord));
    localStorage.setItem(LS_KEYS.last, todayISO);

    setDays(nextDays);
    setRecord(nextRecord);
    setLast(todayISO);

    notificarMudanca();
  }

  const weekButtons = useMemo(() => {
    const now = new Date();
    const todayIdx = weekIndexFromDate(now);
    return Array.from({ length: 7 }, (_, idx) => {
      const label = weekdayShort(idx);
      const isToday = idx === todayIdx;
      const filled = isToday ? jaMarcouHoje : idx < todayIdx && days > 0;
      return { label, isToday, filled };
    });
  }, [days, jaMarcouHoje]);

  return (
    <>
      {/* Botão/Badge na topbar */}
      <button
        ref={btnRef}
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

      {/* Painel em PORTAL (fora do header), não sofre corte por overflow */}
      {open && coords &&
        createPortal(
          <div
            id="streak-panel"
            role="dialog"
            aria-label="Sequência de estudos"
            className="fixed z-[9999] w-[340px] bg-card border border-borderc rounded-2xl shadow-2xl p-3"
            style={{ top: coords.top, left: coords.left }}
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
          </div>,
          document.body
        )
      }
    </>
  );
}
