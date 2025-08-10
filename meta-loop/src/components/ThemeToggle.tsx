'use client';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const stored = localStorage.getItem('theme');
    if (stored) setIsDark(stored === 'dark');
    else setIsDark(html.classList.contains('dark'));
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <button
      type="button"
      onClick={() => setIsDark(v => !v)}
      className="h-9 w-9 rounded-lg border border-borderc bg-background hover:bg-primary/10 flex items-center justify-center"
      title={isDark ? 'Modo escuro' : 'Modo claro'}
      aria-label="Alternar tema"
    >
      {isDark ? '🌙' : '☀️'}
    </button>
  );
}
