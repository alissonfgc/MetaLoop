import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MetaLoop',
  description: 'App de estudos',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* Evita flash trocando o tema antes de renderizar */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(){
  try {
    const stored = localStorage.getItem('theme');
    const preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const useDark = stored ? stored === 'dark' : preferDark;
    if (useDark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-text">
        {children}
      </body>
    </html>
  );
}
