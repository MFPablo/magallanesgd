import { GlitchText } from "@/components/animations/GlitchText";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { useTranslations } from "next-intl";

export default function PortfolioPage() {
  const t = useTranslations("portfolio");

  return (
    <div className="relative z-10 min-h-screen px-6 pt-32 pb-20">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <GlitchText
            text={t("title")}
            as="h1"
            className="mb-16 font-[family-name:var(--font-heading)] text-6xl text-[var(--color-dark)] md:text-8xl"
          />
        </ScrollReveal>
        <PortfolioGrid />
      </div>
    </div>
  );
}
