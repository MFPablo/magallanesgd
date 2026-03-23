"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { projects, type Category } from "@/data/projects";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const categories: (Category | "all")[] = [
  "all",
  "logofolio",
  "branding",
  "editorial",
  "social-media",
];

export function PortfolioGrid() {
  const t = useTranslations("portfolio");
  const [active, setActive] = useState<Category | "all">("all");

  const filtered = active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <div className="mb-12 flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`border px-4 py-2 font-[family-name:var(--font-heading)] text-xs uppercase tracking-widest transition-colors ${
              active === cat
                ? "border-[var(--color-dark)] bg-[var(--color-dark)] text-white"
                : "border-[var(--color-dark)]/20 bg-white text-[var(--color-dark)] hover:border-[var(--color-dark)]/40"
            }`}
          >
            {cat === "all" ? t("all") : cat.replace("-", " ")}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
              transition={{ duration: 0.3 }}
            >
              <Link href={{ pathname: "/portfolio/[slug]", params: { slug: project.slug } }}>
                <div className="group relative aspect-[4/3] overflow-hidden border border-[var(--color-dark)]/10 bg-white">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:blur-[2px]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col items-end justify-end bg-gradient-to-t from-[var(--color-dark)]/60 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                    <h3 className="font-[family-name:var(--font-heading)] text-xl text-white">{project.title}</h3>
                    <p className="text-xs uppercase tracking-widest text-[var(--color-gold)]">
                      {project.category} &bull; {project.year}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
