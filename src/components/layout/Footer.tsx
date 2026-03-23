import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-[var(--color-dark)]/10 bg-[var(--color-cream)]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
        <div className="flex items-center gap-4 font-[family-name:var(--font-heading)] text-sm uppercase tracking-widest">
          <span>Pedro Magallanes</span>
          <span className="text-[var(--color-gold)]">&#9679;</span>
          <span>Diseñador Gráfico</span>
          <span className="text-[var(--color-gold)]">&#9679;</span>
          <span>Argentina</span>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <a href="https://behance.net/pedromagallanes95" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[var(--color-sky)]">
            Behance
          </a>
          <a href="https://linkedin.com/in/pedro-magallanes" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[var(--color-sky)]">
            LinkedIn
          </a>
          <a href="mailto:pedromagallanes.dg@gmail.com" className="transition-colors hover:text-[var(--color-sky)]">
            Email
          </a>
        </div>
        <p className="text-xs text-[var(--color-dark)]/50">
          &copy; {year} Pedro Magallanes. {t("rights")}.
        </p>
      </div>
    </footer>
  );
}
