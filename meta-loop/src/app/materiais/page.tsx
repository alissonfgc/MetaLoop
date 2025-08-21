import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, FileText, FileArchive, Layers3 } from "lucide-react";

export const metadata: Metadata = {
  title: "Materiais — MetaLoop",
};

/**
 * Cart genérico com cabeçalho e “thumb” colorida/gradiente,
 * feito como Server Component (sem JS no cliente).
 */
function ThumbCard({
  title,
  href,
  icon,
  gradient,
}: {
  title: string;
  href: string;
  icon?: React.ReactNode;
  gradient: string; // classes de gradiente (ex: 'from-cyan-400 to-blue-600')
}) {
  return (
    <Link
      href={href}
      className="bg-card border border-borderc rounded-2xl p-2 hover:border-primary/50 transition-colors block"
    >
      <div className="flex items-center justify-between px-2 pt-1 pb-2 text-sm font-semibold text-text/90">
        <span className="truncate">{title}</span>
        {icon ?? null}
      </div>
      <div
        className={`h-28 rounded-xl bg-gradient-to-br ${gradient}`}
        aria-hidden
      />
    </Link>
  );
}

export default function MateriaisPage() {
  const aulas: { title: string; href: string; gradient: string }[] = [
    { title: "Aula 1", href: "/app/materiais/aulas/1", gradient: "from-cyan-400 to-blue-600" },
    { title: "Aula 2", href: "/app/materiais/aulas/2", gradient: "from-orange-500 to-rose-500" },
    { title: "Aula 3", href: "/app/materiais/aulas/3", gradient: "from-violet-500 to-fuchsia-400" },
    { title: "Aula 4", href: "/app/materiais/aulas/4", gradient: "from-cyan-400 to-emerald-400" },
    { title: "Aula 5", href: "/app/materiais/aulas/5", gradient: "from-violet-500 to-amber-300" },
    { title: "Aula 6", href: "/app/materiais/aulas/6", gradient: "from-slate-900 to-indigo-700" },
    { title: "Aula 7", href: "/app/materiais/aulas/7", gradient: "from-emerald-100 to-sky-300" },
    { title: "Aula 8", href: "/app/materiais/aulas/8", gradient: "from-rose-400 to-amber-300" },
  ];

  const packs: {
    title: string;
    href: string;
    gradient: string;
    icon: React.ReactNode;
  }[] = [
    {
      title: "Resumos – Português",
      href: "/app/materiais/packs/pt-resumos",
      gradient: "from-emerald-200 to-sky-200",
      icon: <FileText size={16} className="text-text/70" />,
    },
    {
      title: "Resumos – RLM",
      href: "/app/materiais/packs/rlm-resumos",
      gradient: "from-cyan-400 to-blue-600",
      icon: <FileText size={16} className="text-text/70" />,
    },
    {
      title: "PDF – EPH",
      href: "/app/materiais/packs/eph-pdf",
      gradient: "from-indigo-400 to-emerald-400",
      icon: <FileArchive size={16} className="text-text/70" />,
    },
    {
      title: "Simulados – CBMDF",
      href: "/app/materiais/packs/cbmdf",
      gradient: "from-rose-500 to-orange-500",
      icon: <Layers3 size={16} className="text-text/70" />,
    },
  ];

  return (
    <section className="space-y-6">
      {/* Cabeçalho da página */}
      <div className="bg-card border border-borderc rounded-2xl px-4 py-3 text-sm">
        <div className="text-text/60">Home</div>
      </div>

      {/* Grade de Aulas */}
      <div className="bg-card border border-borderc rounded-2xl p-3 lg:p-4">
        <div className="flex items-center gap-2 px-1 pb-3">
          <BookOpen size={16} className="text-text/70" />
          <h2 className="text-base lg:text-lg font-semibold">Aulas</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
          {aulas.map((a) => (
            <ThumbCard key={a.title} title={a.title} href={a.href} gradient={a.gradient} />
          ))}
        </div>
      </div>

      {/* Seção de Materiais/Packs */}
      <div className="bg-card border border-borderc rounded-2xl p-3 lg:p-4">
        <div className="flex items-center gap-2 px-1 pb-3">
          <FileArchive size={16} className="text-text/70" />
          <h2 className="text-base lg:text-lg font-semibold">Materiais</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {packs.map((p) => (
            <ThumbCard
              key={p.title}
              title={p.title}
              href={p.href}
              gradient={p.gradient}
              icon={p.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
