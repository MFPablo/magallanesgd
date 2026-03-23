"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getFeaturedProjects } from "@/data/projects";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { GlitchText } from "@/components/animations/GlitchText";
import { motion } from "framer-motion";
import Image from "next/image";

export function PortfolioPreview() {
  const t = useTranslations("portfolio");
  const featured = getFeaturedProjects();

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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <ScrollReveal key={project.slug} delay={i * 0.1}>
              <Link href={{ pathname: "/portfolio/[slug]", params: { slug: project.slug } }}>
                <motion.div
                  className="group relative aspect-[4/3] overflow-hidden rounded-sm border border-[var(--color-dark)]/10 bg-white"
                  whileHover={{ scale: 0.98 }}
                >
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105 group-hover:blur-[2px]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--color-dark)]/0 transition-colors duration-300 group-hover:bg-[var(--color-dark)]/60">
                    <span className="font-[family-name:var(--font-heading)] text-2xl text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:text-3xl">
                      {project.title}
                    </span>
                    <span className="mt-2 text-sm uppercase tracking-widest text-[var(--color-gold)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {project.category} &bull; {project.year}
                    </span>
                  </div>
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-12 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-3 border-2 border-[var(--color-dark)] px-8 py-4 font-[family-name:var(--font-heading)] text-sm uppercase tracking-widest transition-colors hover:bg-[var(--color-dark)] hover:text-white"
          >
            {t("viewAll")} <span className="text-[var(--color-gold)]">&rarr;</span>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
