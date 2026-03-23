"use client";

import { useTranslations } from "next-intl";
import { services } from "@/data/services";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { GlitchText } from "@/components/animations/GlitchText";
import { motion } from "framer-motion";

const iconPaths: Record<string, string> = {
  eye: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
  palette: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-1 0-.83.67-1.5 1.5-1.5H16c3.31 0 6-2.69 6-6 0-4.96-4.49-9-10-9z",
  box: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  book: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  share: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z",
  globe: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
};

export function Services() {
  const t = useTranslations("services");

  return (
    <section className="relative z-10 px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <GlitchText
            text={t("title")}
            as="h2"
            className="mb-16 font-[family-name:var(--font-heading)] text-5xl text-[var(--color-dark)] md:text-7xl"
          />
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ScrollReveal key={service.id} delay={i * 0.08}>
              <motion.div
                className="group relative border border-[var(--color-dark)]/10 bg-white p-8 transition-colors hover:border-[var(--color-dark)]/30"
                whileHover={{
                  x: [0, -1, 1, -1, 0],
                  transition: { duration: 0.2 },
                }}
                style={{
                  backgroundImage:
                    "linear-gradient(#E0DED8 1px, transparent 1px), linear-gradient(90deg, #E0DED8 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                  backgroundPosition: "-1px -1px",
                }}
              >
                <svg
                  className="mb-4 h-8 w-8 text-[var(--color-gold)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={iconPaths[service.icon]} />
                </svg>
                <h3 className="font-[family-name:var(--font-heading)] text-xl uppercase">
                  {t(`items.${service.id}.name`)}
                </h3>
                <p className="mt-2 text-sm text-[var(--color-dark)]/60">
                  {t(`items.${service.id}.desc`)}
                </p>
                <p className="mt-4 font-[family-name:var(--font-heading)] text-lg text-[var(--color-gold)]">
                  {service.priceRange}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
