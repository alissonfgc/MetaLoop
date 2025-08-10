'use client';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  // Ler tema inicial (em sincronia com o script do layout)
  useEffect(() => {
    try {
      const stored = localStorage.getItem('theme');
      const preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(stored ? stored === 'dark' : preferDark);
    } catch {}
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <button
      type="button"
      onClick={() => setIsDark((v) => !v)}
      className="px-3 py-1 rounded bg-primary text-white hover:bg-secondary transition-colors"
      aria-label="Alternar tema"
      title={isDark ? 'Modo escuro' : 'Modo claro'}
    >
      {isDark ? '🌙' : '☀️'}
    </button>
  );
}
