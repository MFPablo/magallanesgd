"use client";

import { useTranslations } from "next-intl";
import { skills, software, education, languages } from "@/data/about";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { motion } from "framer-motion";

function StarRating({ level, max = 5 }: { level: number; max?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <motion.svg
          key={i}
          className={`h-5 w-5 ${i < level ? "text-[var(--color-gold)]" : "text-[var(--color-dark)]/10"}`}
          fill="currentColor"
          viewBox="0 0 24 24"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </motion.svg>
      ))}
    </div>
  );
}

export function AboutContent() {
  const t = useTranslations("about");

  return (
    <div className="mx-auto max-w-5xl">
      <div className="grid gap-12 md:grid-cols-[300px_1fr]">
        <ScrollReveal>
          <div className="relative">
            <div className="aspect-[3/4] overflow-hidden bg-[var(--color-dark)]/5">
              <div className="flex h-full items-center justify-center font-[family-name:var(--font-heading)] text-4xl text-[var(--color-dark)]/20">
                PM
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 h-24 w-24 border-2 border-[var(--color-gold)]" />
            <div className="absolute -top-4 -left-4 h-16 w-16 bg-[var(--color-sky)]/20" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="text-lg leading-relaxed text-[var(--color-dark)]/70">{t("bio")}</p>
        </ScrollReveal>
      </div>

      <ScrollReveal className="mt-24">
        <h2 className="mb-8 font-[family-name:var(--font-heading)] text-3xl uppercase">{t("skills")}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {skills.map((skill, i) => (
            <ScrollReveal key={skill.name} delay={i * 0.03}>
              <div className="flex items-center justify-between border-b border-[var(--color-dark)]/10 py-3">
                <span className="text-sm">{skill.name}</span>
                <StarRating level={skill.level} />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal className="mt-24">
        <h2 className="mb-8 font-[family-name:var(--font-heading)] text-3xl uppercase">{t("software")}</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {software.map((sw, i) => (
            <ScrollReveal key={sw.name} delay={i * 0.04}>
              <motion.div
                className="group relative flex flex-col items-center border border-[var(--color-dark)]/10 bg-white p-4"
                whileHover={{ y: -4 }}
              >
                <div
                  className="mb-2 flex h-10 w-10 items-center justify-center rounded text-xs font-bold text-white"
                  style={{ backgroundColor: sw.color }}
                >
                  {sw.shortName}
                </div>
                <span className="text-center text-xs">{sw.name}</span>
                <StarRating level={sw.level} />
                <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[var(--color-dark)] px-3 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {sw.name} - {sw.level}/5
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal className="mt-24">
        <h2 className="mb-8 font-[family-name:var(--font-heading)] text-3xl uppercase">{t("education")}</h2>
        <div className="relative border-l-2 border-[var(--color-gold)] pl-8">
          {education.map((edu, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="relative mb-12 last:mb-0">
                <div className="absolute -left-[2.55rem] top-1 h-4 w-4 rounded-full border-2 border-[var(--color-gold)] bg-[var(--color-cream)]" />
                <p className="font-[family-name:var(--font-heading)] text-sm uppercase tracking-widest text-[var(--color-gold)]">
                  {edu.years}
                </p>
                <h3 className="mt-1 font-[family-name:var(--font-heading)] text-xl uppercase">{edu.institution}</h3>
                <p className="mt-1 text-[var(--color-dark)]/70">{edu.degree}</p>
                {edu.details && (
                  <ul className="mt-2 space-y-1">
                    {edu.details.map((d) => (
                      <li key={d} className="text-sm text-[var(--color-dark)]/50">
                        &bull; {d}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal className="mt-24">
        <h2 className="mb-8 font-[family-name:var(--font-heading)] text-3xl uppercase">{t("languages")}</h2>
        <div className="flex gap-4">
          {languages.map((lang) => (
            <div key={lang.name} className="border border-[var(--color-dark)]/10 bg-white px-6 py-3">
              <span className="font-[family-name:var(--font-heading)] uppercase">{lang.name}</span>
              <span className="ml-2 text-sm text-[var(--color-dark)]/50">({lang.level})</span>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal className="mt-24 text-center">
        <a
          href="https://wa.me/5491134600597"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] px-8 py-4 font-[family-name:var(--font-heading)] uppercase tracking-wider text-white transition-transform hover:scale-105"
        >
          WhatsApp
        </a>
      </ScrollReveal>
    </div>
  );
}
