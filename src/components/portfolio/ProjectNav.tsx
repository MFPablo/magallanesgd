"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import type { Project } from "@/data/projects";
import { motion } from "framer-motion";

interface ProjectNavProps {
  prev: Project | null;
  next: Project | null;
}

export function ProjectNav({ prev, next }: ProjectNavProps) {
  const t = useTranslations("portfolio");

  return (
    <div className="mt-24 flex items-stretch border-t border-[var(--color-dark)]/10">
      {prev ? (
        <Link
          href={{ pathname: "/portfolio/[slug]", params: { slug: prev.slug } }}
          className="group flex flex-1 flex-col items-start border-r border-[var(--color-dark)]/10 p-8 transition-colors hover:bg-[var(--color-dark)]/5"
        >
          <span className="text-xs uppercase tracking-widest text-[var(--color-dark)]/40">
            {t("prev")}
          </span>
          <motion.span
            className="mt-2 font-[family-name:var(--font-heading)] text-xl"
            whileHover={{ x: [0, -2, 2, 0] }}
            transition={{ duration: 0.2 }}
          >
            {prev.title}
          </motion.span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <Link
          href={{ pathname: "/portfolio/[slug]", params: { slug: next.slug } }}
          className="group flex flex-1 flex-col items-end p-8 transition-colors hover:bg-[var(--color-dark)]/5"
        >
          <span className="text-xs uppercase tracking-widest text-[var(--color-dark)]/40">
            {t("next")}
          </span>
          <motion.span
            className="mt-2 font-[family-name:var(--font-heading)] text-xl"
            whileHover={{ x: [0, 2, -2, 0] }}
            transition={{ duration: 0.2 }}
          >
            {next.title}
          </motion.span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}
