"use client";

import type { Project } from "@/data/projects";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { GlitchText } from "@/components/animations/GlitchText";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface CaseStudyProps {
  project: Project;
}

export function CaseStudy({ project }: CaseStudyProps) {
  const t = useTranslations("caseStudy");
  const tp = useTranslations(`projects.${project.slug}`);

  return (
    <article>
      <div className="relative h-[60vh] w-full overflow-hidden md:h-[70vh]">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1, filter: "blur(8px)" }}
          animate={{ scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark)]/80 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 md:p-16">
          <GlitchText
            text={project.title}
            as="h1"
            className="font-[family-name:var(--font-heading)] text-5xl text-white md:text-7xl"
          />
          <p className="mt-2 font-[family-name:var(--font-heading)] text-lg uppercase tracking-widest text-[var(--color-gold)]">
            {project.category} &bull; {project.year}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="grid gap-16 md:grid-cols-[1fr_250px]">
          <div className="space-y-16">
            <ScrollReveal>
              <h2 className="mb-4 font-[family-name:var(--font-heading)] text-2xl uppercase">{t("problem")}</h2>
              <p className="text-[var(--color-dark)]/70 leading-relaxed">{tp("problem")}</p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="mb-4 font-[family-name:var(--font-heading)] text-2xl uppercase">{t("process")}</h2>
              <p className="text-[var(--color-dark)]/70 leading-relaxed">{tp("process")}</p>
            </ScrollReveal>

            <ScrollReveal>
              <div className="grid gap-4">
                {project.images.map((img, i) => (
                  <motion.div
                    key={i}
                    className="relative aspect-video overflow-hidden border border-[var(--color-dark)]/10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Image
                      src={img}
                      alt={`${project.title} - ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 700px"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="mb-4 font-[family-name:var(--font-heading)] text-2xl uppercase">{t("solution")}</h2>
              <p className="text-[var(--color-dark)]/70 leading-relaxed">{tp("solution")}</p>
            </ScrollReveal>
          </div>

          <aside className="hidden md:block">
            <div className="sticky top-32 space-y-8 border-l border-[var(--color-dark)]/10 pl-8">
              <div>
                <h3 className="font-[family-name:var(--font-heading)] text-xs uppercase tracking-widest text-[var(--color-dark)]/40">{t("client")}</h3>
                <p className="mt-1">{project.client}</p>
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-heading)] text-xs uppercase tracking-widest text-[var(--color-dark)]/40">{t("year")}</h3>
                <p className="mt-1">{project.year}</p>
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-heading)] text-xs uppercase tracking-widest text-[var(--color-dark)]/40">{t("category")}</h3>
                <p className="mt-1 capitalize">{project.category.replace("-", " ")}</p>
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-heading)] text-xs uppercase tracking-widest text-[var(--color-dark)]/40">{t("tools")}</h3>
                <div className="mt-1 flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span key={tool} className="border border-[var(--color-dark)]/10 px-2 py-1 text-xs">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              {project.palette && (
                <div>
                  <h3 className="font-[family-name:var(--font-heading)] text-xs uppercase tracking-widest text-[var(--color-dark)]/40">{t("palette")}</h3>
                  <div className="mt-2 flex gap-2">
                    {project.palette.map((color) => (
                      <div
                        key={color}
                        className="h-8 w-8 rounded-full border border-[var(--color-dark)]/10"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
